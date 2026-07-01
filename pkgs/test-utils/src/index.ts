export const calculateHash = async (doc: string): Promise<string> => {
  const buf = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(doc));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
