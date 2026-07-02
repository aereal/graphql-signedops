import { type Exchange } from "@urql/core";
import { type OperationSignatures } from "graphql-signedops";
import { createExchange } from "./create-exchange";

const identity = <V>(v: V): Promise<V> => Promise.resolve(v);

/**
 * Signs GraphQL operations ahead of time and attaches the corresponding signature when a request is sent.
 *
 * It is more secure and strict, so it is recommended for production use.
 */
export const aheadOfTimeSignExchange = (sigs: OperationSignatures): Exchange =>
  createExchange(sigs, identity);
