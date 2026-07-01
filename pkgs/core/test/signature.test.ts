import { type DocumentNode, parse, print } from "graphql";
import { calculateHash } from "test-utils";
import { describe, expect, it } from "vitest";
import { type DocumentSigner } from "../src/document-signer";
import { createOperationSignatures } from "../src/signature";

class Hasher implements DocumentSigner {
  async signDocument(doc: DocumentNode): Promise<string> {
    return await calculateHash(print(doc));
  }
}

describe("createOperationSignatures", () => {
  describe("pass no documents", () => {
    it("returns an empty object", async () => {
      const got = await createOperationSignatures(new Hasher(), [parse(`{ number }`)]);
      expect(got).toStrictEqual({
        "25354f38bfc2053a6b1b52f7d76d359012b4b2ad434da53e2417bcc6eed2c856":
          "25354f38bfc2053a6b1b52f7d76d359012b4b2ad434da53e2417bcc6eed2c856",
      });
    });
  });
});
