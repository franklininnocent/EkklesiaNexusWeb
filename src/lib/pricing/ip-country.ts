import { readFileSync } from "node:fs";
import path from "node:path";
import { gunzipSync } from "node:zlib";
import { isIP } from "node:net";

type CountryIndex = {
  codes: string[];
  v4Start: Uint32Array;
  v4End: Uint32Array;
  v4Country: Uint16Array;
  v6Start: Uint32Array;
  v6End: Uint32Array;
  v6Country: Uint16Array;
};

let cached: CountryIndex | null | undefined;

function databasePath(): string {
  return path.join(process.cwd(), "data/geo/dbip-country-lite.csv.gz");
}

function ipv4ToUint(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) {
    return null;
  }
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) {
      return null;
    }
    const octet = Number(part);
    if (octet > 255) {
      return null;
    }
    value = value * 256 + octet;
  }
  return value >>> 0;
}

function ipv6Words(ip: string): Uint32Array | null {
  if (ip.includes(".")) {
    return null;
  }
  const halves = ip.split("::");
  if (halves.length > 2) {
    return null;
  }
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 && head.length !== 8) {
    return null;
  }
  if (halves.length === 2 && missing < 0) {
    return null;
  }
  const groups = halves.length === 2 ? [...head, ...Array(missing).fill("0"), ...tail] : head;
  if (groups.length !== 8) {
    return null;
  }
  const words = new Uint32Array(4);
  for (let i = 0; i < 8; i += 1) {
    const group = groups[i] ?? "";
    if (!/^[0-9a-fA-F]{1,4}$/.test(group)) {
      return null;
    }
    const piece = parseInt(group, 16);
    const word = i >> 1;
    words[word] = i % 2 === 0 ? piece * 65536 : (words[word] ?? 0) + piece;
  }
  return words;
}

function compareV6(words: Uint32Array, index: number, ip: Uint32Array): number {
  const base = index * 4;
  for (let i = 0; i < 4; i += 1) {
    const left = words[base + i] ?? 0;
    const right = ip[i] ?? 0;
    if (left < right) {
      return -1;
    }
    if (left > right) {
      return 1;
    }
  }
  return 0;
}

function sortRangeOrder(starts: number[], ends: number[], compare: (a: number, b: number) => number): number[] {
  const order = starts.map((_, index) => index);
  order.sort((left, right) => {
    const byStart = compare(starts[left] ?? 0, starts[right] ?? 0);
    return byStart !== 0 ? byStart : compare(ends[left] ?? 0, ends[right] ?? 0);
  });
  return order;
}

function compareV6Flat(words: number[], left: number, right: number): number {
  const a = left * 4;
  const b = right * 4;
  for (let i = 0; i < 4; i += 1) {
    const av = words[a + i] ?? 0;
    const bv = words[b + i] ?? 0;
    if (av < bv) {
      return -1;
    }
    if (av > bv) {
      return 1;
    }
  }
  return 0;
}

function sortV6Order(starts: number[], ends: number[]): number[] {
  const count = starts.length / 4;
  const order = Array.from({ length: count }, (_, index) => index);
  order.sort((left, right) => {
    const byStart = compareV6Flat(starts, left, right);
    return byStart !== 0 ? byStart : compareV6Flat(ends, left, right);
  });
  return order;
}

function packV6(words: number[], order: number[]): Uint32Array {
  const packed = new Uint32Array(order.length * 4);
  order.forEach((index, position) => {
    const from = index * 4;
    const to = position * 4;
    packed[to] = words[from] ?? 0;
    packed[to + 1] = words[from + 1] ?? 0;
    packed[to + 2] = words[from + 2] ?? 0;
    packed[to + 3] = words[from + 3] ?? 0;
  });
  return packed;
}

function loadIndex(): CountryIndex | null {
  if (cached !== undefined) {
    return cached;
  }
  try {
    const text = gunzipSync(readFileSync(databasePath())).toString("utf8");
    const lines = text.split("\n");
    const codes: string[] = [];
    const codeId = new Map<string, number>();
    const v4Start: number[] = [];
    const v4End: number[] = [];
    const v4Country: number[] = [];
    const v6Start: number[] = [];
    const v6End: number[] = [];
    const v6Country: number[] = [];

    const idFor = (code: string): number => {
      const existing = codeId.get(code);
      if (existing !== undefined) {
        return existing;
      }
      const id = codes.length;
      codes.push(code);
      codeId.set(code, id);
      return id;
    };

    for (const line of lines) {
      if (!line) {
        continue;
      }
      const commaA = line.indexOf(",");
      const commaB = line.indexOf(",", commaA + 1);
      if (commaA <= 0 || commaB <= commaA) {
        continue;
      }
      const startRaw = line.slice(0, commaA);
      const endRaw = line.slice(commaA + 1, commaB);
      const code = line.slice(commaB + 1).trim().toUpperCase();
      if (!/^[A-Z]{2}$/.test(code)) {
        continue;
      }
      const country = idFor(code);
      if (startRaw.includes(":")) {
        const start = ipv6Words(startRaw);
        const end = ipv6Words(endRaw);
        if (!start || !end) {
          continue;
        }
        v6Start.push(start[0] ?? 0, start[1] ?? 0, start[2] ?? 0, start[3] ?? 0);
        v6End.push(end[0] ?? 0, end[1] ?? 0, end[2] ?? 0, end[3] ?? 0);
        v6Country.push(country);
      } else {
        const start = ipv4ToUint(startRaw);
        const end = ipv4ToUint(endRaw);
        if (start === null || end === null) {
          continue;
        }
        v4Start.push(start);
        v4End.push(end);
        v4Country.push(country);
      }
    }

    const v4Order = sortRangeOrder(v4Start, v4End, (a, b) => a - b);
    const v6Order = sortV6Order(v6Start, v6End);

    cached = {
      codes,
      v4Start: Uint32Array.from(v4Order.map((index) => v4Start[index] ?? 0)),
      v4End: Uint32Array.from(v4Order.map((index) => v4End[index] ?? 0)),
      v4Country: Uint16Array.from(v4Order.map((index) => v4Country[index] ?? 0)),
      v6Start: packV6(v6Start, v6Order),
      v6End: packV6(v6End, v6Order),
      v6Country: Uint16Array.from(v6Order.map((index) => v6Country[index] ?? 0)),
    };
    return cached;
  } catch (error) {
    console.info("marketing.pricing.ip_country_unavailable", {
      message: error instanceof Error ? error.message : "unreadable",
    });
    cached = null;
    return null;
  }
}

function lookupV4(index: CountryIndex, ip: number): string | null {
  let lo = 0;
  let hi = index.v4Start.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if ((index.v4Start[mid] ?? 0) <= ip) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (found < 0 || ip > (index.v4End[found] ?? 0)) {
    return null;
  }
  return index.codes[index.v4Country[found] ?? 0] ?? null;
}

function lookupV6(index: CountryIndex, ip: Uint32Array): string | null {
  const count = index.v6Country.length;
  let lo = 0;
  let hi = count - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const cmp = compareV6(index.v6Start, mid, ip);
    if (cmp <= 0) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (found < 0 || compareV6(index.v6End, found, ip) < 0) {
    return null;
  }
  return index.codes[index.v6Country[found] ?? 0] ?? null;
}

/** ISO country for a public IP, or null when unknown. ZZ (not a country) is null. */
export function countryForIp(ip: string): string | null {
  if (isIP(ip) === 0) {
    return null;
  }
  const index = loadIndex();
  if (!index) {
    return null;
  }
  const code = ip.includes(":")
    ? (() => {
        const words = ipv6Words(ip);
        return words ? lookupV6(index, words) : null;
      })()
    : (() => {
        const value = ipv4ToUint(ip);
        return value === null ? null : lookupV4(index, value);
      })();
  if (!code || code === "ZZ") {
    return null;
  }
  return code;
}
