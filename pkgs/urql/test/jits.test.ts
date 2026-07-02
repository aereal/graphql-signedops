import {
  createRequest,
  makeOperation,
  type Client,
  type ExchangeIO,
  type Operation,
  type OperationResult,
} from "@urql/core";
import { parse, print, type DocumentNode } from "graphql";
import { type DocumentSigner } from "graphql-signedops";
import { describe, expect, it } from "vitest";
import { fromValue, map, pipe, toPromise } from "wonka";
import { justInTimeSignExchange } from "../src/just-in-time-sign";

const query1 = parse(`{ number }`);

class DumbSigner implements DocumentSigner {
  signDocument(doc: DocumentNode): Promise<string> {
    return Promise.resolve(print(doc));
  }
}

describe("ahedOfTimeSignExchange", () => {
  describe("some signatures", () => {
    it("add operationSignature to extensions", async () => {
      let capturedOp: Operation | undefined;
      const exchange = justInTimeSignExchange(new DumbSigner());

      const forward: ExchangeIO = (ops$) =>
        pipe(
          ops$,
          map((op) => {
            capturedOp = op;
            return {
              operation: op,
              data: {},
              stale: false,
              hasNext: false,
            } as OperationResult;
          }),
        );

      const exchangeIO = exchange({
        client: {} as unknown as Client,
        forward,
        dispatchDebug: () => {},
      });

      const request = createRequest(query1, {});
      const operation = makeOperation("query", request, {
        url: "http://graphql.test/graphql",
        requestPolicy: "network-only",
      });

      await pipe(fromValue(operation), exchangeIO, toPromise);

      expect(capturedOp).toBeDefined();
      expect(capturedOp!.extensions).toStrictEqual({
        operationSignature: "{\n  number\n}",
      });
    });
  });
});
