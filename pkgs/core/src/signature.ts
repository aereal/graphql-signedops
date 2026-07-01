import { print, type DocumentNode } from "graphql";
import { type DocumentSigner } from "./document-signer";

export type OperationSignatures = Record<string, string>;

export const createOperationSignatures = async (
  signer: DocumentSigner,
  docs: Iterable<DocumentNode>,
): Promise<OperationSignatures> => {
  const ret: OperationSignatures = {};
  for (const d of docs) {
    ret[await calcHash(d)] = await signer.signDocument(d);
  }
  return ret;
};

export const getOperationSignature = async (
  signatures: OperationSignatures,
  doc: DocumentNode,
): Promise<string | undefined> => signatures[await calcHash(doc)];

const calcHash = async (doc: DocumentNode): Promise<string> => {
  const buf = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(print(doc)),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
