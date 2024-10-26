import { Connection } from "../models/connection";
import { Edge, Node } from "@xyflow/react";

const nodeToConnection = (nodes: Node[], edge: Edge): Connection[] => {
  const startNode = nodes.find(({ id }) => edge.source === id);
  const endNode = nodes.find(({ id }) => edge.target === id);

  const edges = (edge.label as string).split(",").map((edge) => edge.trim());

  return edges.map((edge) => ({
    from: startNode!.data!.label as string,
    to: endNode!.data.label as string,
    using: edge as string,
  }));
};

export const nodesToConnections = (
  nodes: Node[],
  edges: Edge[]
): Connection[] => {
  return edges
    .map((edge) => nodeToConnection(nodes, edge))
    .reduce((current, actual) => [...current, ...actual]);
};
