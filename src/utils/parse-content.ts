export function parseContent(raw: string): { main: string; meta: string } {
  if (!raw) return { main: "", meta: "" };
  const first = raw.indexOf("(");
  const last = raw.lastIndexOf(")");
  if (first !== -1 && last !== -1 && last > first) {
    const main = raw.slice(0, first).trim();
    const meta = raw.slice(first + 1, last).trim();
    return { main, meta };
  }
  return { main: raw.trim(), meta: "" };
}

export function composeContent(main: string, meta: string) {
  const m = (main ?? "").trim();
  const t = (meta ?? "").trim();
  return t ? `${m}(${t})` : m;
}