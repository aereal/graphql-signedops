import { print, type DocumentNode } from "graphql";
import { type JWTPayload } from "jose";

export interface Payload extends JWTPayload {
  graphqlOperation: string;
}

export const buildPayload = (doc: DocumentNode): Payload => ({ graphqlOperation: print(doc) });
