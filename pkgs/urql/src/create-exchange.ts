import { type AnyVariables, type Exchange, mapExchange, type Operation } from "@urql/core";
import { getOperationSignature, type OperationSignatures } from "graphql-signedops";
import { appendSignature } from "./append-signature";

export type OnMissingSignatureFunc = (
  op: Operation<unknown, AnyVariables>,
) => Promise<Operation<unknown, AnyVariables>>;

export const createExchange = (
  sigs: OperationSignatures,
  onMissingSignature: OnMissingSignatureFunc,
): Exchange =>
  mapExchange({
    async onOperation(prevOp) {
      if (prevOp.kind === "teardown") {
        return prevOp;
      }

      const sig = await getOperationSignature(sigs, prevOp.query);
      if (sig === undefined) {
        return await onMissingSignature(prevOp);
      }

      return appendSignature(prevOp, sig);
    },
  });
