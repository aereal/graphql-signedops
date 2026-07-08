import { type DocumentNode } from "graphql";

/**
 * an interface to calculate the signature of GraphQL document.
 */
export interface DocumentSigner {
  signDocument(doc: DocumentNode): Promise<string>;
}
