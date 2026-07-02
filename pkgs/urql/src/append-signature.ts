import { makeOperation, type AnyVariables, type Operation } from "@urql/core";

export const appendSignature = <Data, Variables extends AnyVariables = AnyVariables>(
  prevOp: Operation<Data, Variables>,
  sig: string,
): Operation<Data, Variables> =>
  makeOperation(
    prevOp.kind,
    {
      key: prevOp.key,
      query: prevOp.query,
      variables: prevOp.variables,
      extensions: {
        ...prevOp.extensions,
        operationSignature: sig,
      },
    },
    prevOp.context,
  );
