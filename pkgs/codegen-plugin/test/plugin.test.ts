import { buildSchema, type DocumentNode, parse, print } from "graphql";
import { type DocumentSigner } from "graphql-signed-query";
import { calculateHash } from "test-utils";
import { describe, expect, it } from "vitest";
import { codegenPlugin } from "../src/plugin";

const schema = buildSchema(`
type Query {
  number: Int!
}`);

class Hasher implements DocumentSigner {
  async signDocument(doc: DocumentNode): Promise<string> {
    return await calculateHash(print(doc));
  }
}

describe("plugin", () => {
  describe("main", () => {
    describe("some document files", () => {
      it("emits a signature", async () => {
        const ret = await codegenPlugin.plugin(
          schema,
          [{ document: parse(`{ number }`), location: "query1.ts" }],
          { signer: new Hasher() },
        );
        expect(ret).toMatchSnapshot();
      });
    });

    describe("no document files", () => {
      it("emits empty object", async () => {
        const ret = await codegenPlugin.plugin(schema, [], { signer: new Hasher() });
        expect(ret).toMatchSnapshot();
      });
    });
  });
});
