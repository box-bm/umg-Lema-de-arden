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
    <>
      <div style={{ padding: "20px 10px" }}>
        <h1>Resolución por Arden</h1>
        <div style={{ display: "flex", paddingTop: 10, gap: 25 }}>
          <div>
            <h4>Ecuaciones</h4>
            <ul style={{ listStyle: "circle" }}>
              {equations.map((equation) => (
                <li>{equation}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Solución</h4>
            {ardenResult}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArdenResult;
