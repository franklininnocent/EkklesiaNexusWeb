/** Serialize JSON-LD without allowing `</script>` breakout in HTML. */
export function safeJsonLdStringify(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
