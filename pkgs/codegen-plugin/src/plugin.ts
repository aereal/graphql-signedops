import {
  type CodegenPlugin,
  type PluginFunction,
  type PluginValidateFn,
} from "@graphql-codegen/plugin-helpers";
import { type DocumentSigner } from "graphql-signed-query/document-signer";
import { createOperationSignatures } from "graphql-signed-query/signature";

export class MissingSignerError extends Error {
  constructor() {
    super("signer is required");
  }
}

export interface Config {
  signer: DocumentSigner;
}

const plugin = (async (_schema, files, config) => {
  const docs = files.flatMap((f) => (f.document ? [f.document] : []));
  const sigs = await createOperationSignatures(config.signer, docs);
  return JSON.stringify(sigs) + "\n";
}) satisfies PluginFunction<Config, string>;

const validate: PluginValidateFn<Partial<Config>> = (_schema, _docs, config) => {
  if (!config.signer) {
    throw new MissingSignerError();
  }
};

export const codegenPlugin: CodegenPlugin<Config> = {
  plugin,
  validate,
};
