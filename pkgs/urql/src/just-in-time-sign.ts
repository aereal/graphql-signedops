import { type Exchange } from "@urql/core";
import { type DocumentSigner } from "graphql-signedops";
import { appendSignature } from "./append-signature";
import { createExchange } from "./create-exchange";

/**
 * Signs each request at send time.
 *
 * Because it accesses the signing key and signs synchronously during the exchange's execution, it has worse runtime performance.
 *
 * It is useful when pre-signing operations is undesirable.
 */
export const justInTimeSignExchange = (signer: DocumentSigner): Exchange =>
  createExchange({}, async (op) => {
    const sig = await signer.signDocument(op.query);
    return appendSignature(op, sig);
  });
