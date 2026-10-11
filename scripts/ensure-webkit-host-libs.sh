#!/usr/bin/env bash
# WebKit (Safari engine) on this Ubuntu image needs libevent-2.1.so.7.
# We cannot apt-install without sudo, so extract the package next to Playwright's bundle.
set -euo pipefail

export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS="${PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS:-1}"

BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-${HOME}/.cache/ms-playwright}"
WEBKIT_SYS_LIB="$(find "${BROWSERS_PATH}" -type d -path '*/minibrowser-wpe/sys/lib' 2>/dev/null | head -n 1 || true)"

if [[ -z "${WEBKIT_SYS_LIB}" ]]; then
  exit 0
fi

if [[ -e "${WEBKIT_SYS_LIB}/libevent-2.1.so.7" ]]; then
  exit 0
fi

STAGE="${TMPDIR:-/tmp}/pw-webkit-deps"
mkdir -p "${STAGE}"
(
  cd "${STAGE}"
  if [[ ! -f "${STAGE}/root/usr/lib/x86_64-linux-gnu/libevent-2.1.so.7" ]]; then
    apt-get download libevent-2.1-7t64 >/dev/null
    dpkg-deb -x libevent-2.1-7t64_*.deb ./root
  fi
)
cp -a "${STAGE}/root/usr/lib/x86_64-linux-gnu"/libevent-2.1.so.7* "${WEBKIT_SYS_LIB}/"
GTK_SYS_LIB="${WEBKIT_SYS_LIB/minibrowser-wpe/minibrowser-gtk}"
if [[ -d "${GTK_SYS_LIB}" ]]; then
  cp -a "${STAGE}/root/usr/lib/x86_64-linux-gnu"/libevent-2.1.so.7* "${GTK_SYS_LIB}/"
fi
