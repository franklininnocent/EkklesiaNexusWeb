import IntlMessageFormat from "intl-messageformat";
import type { Messages } from "@/lib/i18n/messages";

type Primitive = string | number | boolean | null | undefined;

type MessageValues = Record<string, Primitive>;

function resolvePath(messages: Messages, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = messages;
  for (const part of parts) {
    if (current === null || typeof current !== "object" || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function createTranslator(messages: Messages) {
  return function t(key: string, values?: MessageValues): string {
    const template = resolvePath(messages, key);
    if (template === undefined) {
      if (process.env.NODE_ENV === "production") {
        return "";
      }
      return `[missing:${key}]`;
    }
    if (!values || Object.keys(values).length === 0) {
      return template;
    }
    try {
      const formatter = new IntlMessageFormat(template, undefined, undefined, {
        ignoreTag: true,
      });
      return String(formatter.format(values));
    } catch {
      return template;
    }
  };
}

export type Translator = ReturnType<typeof createTranslator>;
