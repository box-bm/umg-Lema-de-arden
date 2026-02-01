import { Node, Edge } from "@xyflow/react";
import { nodesToConnections } from "./utils/nodesToConnection";
import { resolveArden } from "./utils/arden";
import { makeEquations } from "./utils/makeEquation";

interface Props {
  nodes: Node[];
  edges: Edge[];
}

const ArdenResult = ({ edges, nodes }: Props) => {
  const connections = nodesToConnections(nodes, edges);
  const ardenResult = resolveArden(connections);
  const equations = makeEquations(connections);

  return (
    <div>
      <h1>Resolución por Arden</h1>
      <div style={{ marginTop: 12 }}>
        <h4>Ecuaciones</h4>
        <ul style={{ listStyle: "none" }}>
          {equations.map((equation) => (
            <li key={equation}>{equation}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Solución</h4>
        {ardenResult}
      </div>
    </div>
  );
};

export default ArdenResult;
