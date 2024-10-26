import { Connection } from "../models/connection";

export const makeEquations = (connections: Connection[]): string[] => {
  const states = new Set(connections.map(({ from }) => from));

  const equations: string[] = [];
  states.forEach((state) => {
    const stateConnections = connections.filter(({ from }) => from === state);

    const transitions = stateConnections.map(
      ({ to, using }) => `${using}(${to})`
    );
    equations.push(`${state}=${transitions.join("+")}`);
  });

  return equations;
};
