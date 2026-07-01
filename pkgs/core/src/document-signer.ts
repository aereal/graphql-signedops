import { type DocumentNode } from "graphql";

/**
 * @description an interface to calculate the signature of GraphQL document.
 */
export interface DocumentSigner {
  signDocument(doc: DocumentNode): Promise<string>;
}
