import { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomNode from "./Node";
import ArdenResult from "./ArdenResult";
import AddEdgeForm from "./components/AddEdgeForm";

import { v4 as uuidv4 } from "uuid";
import SelfConnecting from "./components/SelfConnecting";
import StateChecklist from "./components/StateChecklist";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 40 },
    data: { label: "q0" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 40 },
    data: { label: "q1" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 400, y: 40 },
    data: { label: "q2" },
  },
];

const initialEdges: Edge[] = [
  // self loops
  {
    id: "e1-1",
    source: "1",
    target: "1",
    sourceHandle: "out-top",
    targetHandle: "in",
    label: "0",
    type: "selfConnecting",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e2-2",
    source: "2",
    target: "2",
    sourceHandle: "out-top",
    targetHandle: "in",
    label: "1",
    type: "selfConnecting",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e3-3",
    source: "3",
    target: "3",
    sourceHandle: "out-top",
    targetHandle: "in",
    label: "0,1",
    type: "selfConnecting",
    markerEnd: { type: MarkerType.Arrow },
  },
  // noraml edges
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "out-right",
    targetHandle: "in",
    label: "1",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "out-right",
    targetHandle: "in",
    label: "0",
    markerEnd: { type: MarkerType.Arrow },
  },
];

const nodeTypes = { custom: CustomNode };
const edgeTypes = {
  selfConnecting: SelfConnecting,
};

export default function App() {
  const [states, setState] = useState(["0", "1"]);

  const [selection, setSelection] = useState<"edge" | "node" | "none">("none");
  const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>(undefined);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type:
              params.source === params.target ? "selfConnecting" : undefined,
            label: "0",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const createNode = (value: string) => {
    const result = nodes.find(
      ({ data }) => (data.label as string).trim() === value.trim(),
    );

    if (result) {
      window.alert("no podemos agregar nodos con el mismo nombre");
      return;
    }

    setNodes((nodes) => [
      ...nodes,
      {
        id: uuidv4(),
        type: "custom",
        data: { label: value },
        position: {
          x: nodes.reverse()[0].position.x + 150,
          y: nodes.reverse()[0].position.y,
        },
      },
    ]);
  };

  const handleDeleteNode = (value: string) => {
    if (nodes.length <= 1) {
      window.alert("No podemos eliminar todos los nodos");
      return;
    }

    const id = nodes.find(({ data }) => data.label === value)?.id;

    if (!id) throw new Error("ID no existe");

    setEdges((edges) =>
      edges.filter(({ target, source }) => ![target, source].includes(id)),
    );
    setNodes((nodes) => nodes.filter(({ data }) => data.label !== value));
  };

  const addStates = (state: string) => {
    const result = states.find(
      (s) => s.trim().toLowerCase() === state.trim().toLowerCase(),
    );

    if (result) {
      window.alert("No podemos agregar estados con el mismo nombre");
      return;
    }

    setState((states) => [...states, state]);
  };

  const removeState = (deletedState: string) => {
    if (states.length <= 2) {
      window.alert("No puedes eliminar más estados");
      return;
    }

    setState((states) => states.filter((state) => state != deletedState));
    const newEdges = edges.filter((edge) => {
      const labels = edge.label
        ?.toString()
        .split(",")
        .map((s) => s.trim());
      if (!labels) return true;
      return !labels.includes(deletedState);
    });
    setEdges(newEdges);
  };

  const handleUpdateEdge = (value: string[]): boolean => {
    if (value.length === 0) {
      window.alert("Un nodo debe tener al menos un estado asignado");
      return false;
    }

    setEdges((edges) => {
      const index = edges.findIndex((edge) => edge.id === selectedEdge?.id);
      edges[index].label = value.join(",");
      return edges;
    });
    return true;
  };

  const handleUpdateNode = (value: string) => {
    setNodes((n) => {
      const nodeIndex = n.findIndex((node) => node.id === selectedNode?.id);
      n[nodeIndex].data.label = value;

      return n;
    });
  };

  const handleEdgeClicked = (edge: Edge) => {
    setSelectedEdge(edge);
    setSelection("edge");
  };

  const handleNodeClicked = (node: Node) => {
    setSelectedNode(node);
    setSelection("node");
  };

  const handleMinimapSelection = () => {
    setSelectedEdge(undefined);
    setSelectedNode(undefined);
    setSelection("none");
  };

  return (
    <div>
      <div
        style={{
          minHeight: "10vh",
          borderBottomColor: "#ececec",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          padding: 12,
        }}
      >
        <ArdenResult edges={edges} nodes={nodes} />
      </div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderColor: "#ececec",
          borderWidth: 1,
          borderStyle: "solid",
          right: 4,
          marginTop: 4,
          padding: 18,
          borderRadius: 20,
          zIndex: 4,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        {selection === "none" && (
          <>
            <h2>Estados</h2>

            <AddEdgeForm onPress={addStates} />
            <ul
              style={{
                margin: "10px 0px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {states.map((state) => (
                <li
                  key={state}
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div>{state}</div>
                  <button
                    className={`danger ${states.length <= 2 && "disabled"}`}
                    disabled={states.length <= 1}
                    onClick={() => removeState(state)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <h2>Nodos</h2>

            <AddEdgeForm onPress={createNode} />
            <div
              style={{
                margin: "10px 0px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {nodes.map(({ data }) => (
                <div
                  key={data.label as string}
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div>{data.label as string}</div>
                  <button
                    className={`danger ${nodes.length <= 1 && "disabled"}`}
                    disabled={nodes.length <= 1}
                    onClick={() => handleDeleteNode(data.label as string)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selection === "edge" && selectedEdge && (
          <>
            <h2>Cambiar de estado</h2>
            <hr />
            <label>Selecciona el nuevo estado</label>
            <div id="edge-states-select">
              <StateChecklist
                states={states}
                edge={selectedEdge}
                onStateChanges={handleUpdateEdge}
              />
            </div>
            <button
              className="danger"
              onClick={() => {
                setEdges((eds) => eds.filter((e) => e.id !== selectedEdge?.id));
                setSelection("none");
              }}
            >
              Eliminar Transicion
            </button>
          </>
        )}

        {selection === "node" && (
          <>
            <h2>Cambiar de nodo</h2>
            <p>Selecciona el nuevo valor del nodo</p>
            <select
              style={{ width: "100%", margin: "10px 0px" }}
              defaultValue={selectedNode?.data.label as string}
              onChange={(e) => handleUpdateNode(e.target.value)}
            >
              {nodes.map((node) => (
                <option key={node.id} value={node.data.label as string}>
                  {node.data.label as string}
                </option>
              ))}
            </select>
            <button
              className="danger"
              onClick={() => {
                setEdges((eds) =>
                  eds.filter(
                    (e) =>
                      e.source !== selectedNode?.id &&
                      e.target !== selectedNode?.id,
                  ),
                );
                setNodes((nds) => nds.filter((n) => n.id !== selectedNode?.id));
                setSelection("none");
              }}
            >
              Eliminar Nodo
            </button>
          </>
        )}
      </div>
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={(_, e) => handleEdgeClicked(e)}
          onNodeClick={(_, n) => handleNodeClicked(n)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onPaneClick={handleMinimapSelection}
          onPaneScroll={handleMinimapSelection}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Controls onFitView={handleMinimapSelection} />
          <MiniMap onClick={handleMinimapSelection} />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
