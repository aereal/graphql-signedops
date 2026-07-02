import {
  createRequest,
  makeOperation,
  type Client,
  type ExchangeIO,
  type Operation,
  type OperationResult,
} from "@urql/core";
import { parse } from "graphql";
import { describe, expect, it } from "vitest";
import { fromValue, map, pipe, toPromise } from "wonka";
import { aheadOfTimeSignExchange } from "../src/ahead-of-time-sign";

const query1 = parse(`{ number }`);

describe("ahedOfTimeSignExchange", () => {
  describe("some signatures", () => {
    it("add operationSignature to extensions", async () => {
      let capturedOp: Operation | undefined;
      const exchange = aheadOfTimeSignExchange({
        "25354f38bfc2053a6b1b52f7d76d359012b4b2ad434da53e2417bcc6eed2c856":
          "eyJhbGciOiJIUzI1NiJ9.eyJncmFwaHFsT3BlcmF0aW9uIjoie1xuICBudW1iZXJcbn0ifQ.DQSqZh1acgcJs3AaRxNDi18z3OTAchgGmrcNvk74apE",
      });

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
        operationSignature:
          "eyJhbGciOiJIUzI1NiJ9.eyJncmFwaHFsT3BlcmF0aW9uIjoie1xuICBudW1iZXJcbn0ifQ.DQSqZh1acgcJs3AaRxNDi18z3OTAchgGmrcNvk74apE",
      });
    });
  });

  describe("empty signatures", () => {
    it("does not add operationSignature to extensions", async () => {
      let capturedOp: Operation | undefined;
      const exchange = aheadOfTimeSignExchange({});

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
      const exchangeIO = exchange({ client: {} as unknown as Client, forward, dispatchDebug() {} });

      const operation = makeOperation("query", createRequest(query1, {}), {
        url: "http://graphql.test/graphql",
        requestPolicy: "network-only",
      });
      await pipe(fromValue(operation), exchangeIO, toPromise);

      expect(capturedOp).toBeDefined();
      expect(capturedOp?.extensions).toBeUndefined();
    });
  });
});
