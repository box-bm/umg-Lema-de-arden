import React, { useCallback, useEffect, useState } from "react";
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
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomNode from "./Node";
import CustomEdge from "./Edge";
import ArdenResult from "./ArdenResult";
import AddEdgeForm from "./components/AddEdgeForm";

import { v4 as uuidv4 } from "uuid";

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
  {
    id: "e1-1",
    source: "1",
    target: "1",
    type: "custom-edge",
    sourceHandle: "out-top",
    targetHandle: "in",
    label: "0",
  },
  {
    id: "e2-2",
    source: "2",
    target: "2",
    type: "custom-edge",
    sourceHandle: "out-top",
    targetHandle: "in",
    label: "1",
  },
  {
    id: "e3-3",
    source: "3",
    target: "3",
    type: "custom-edge",
    sourceHandle: "out-top",
    targetHandle: "in",
    label: "0,1",
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "custom-edge",
    sourceHandle: "out-right",
    targetHandle: "in",
    label: "1",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "custom-edge",
    sourceHandle: "out-right",
    targetHandle: "in",
    label: "0",
  },
];

const nodeTypes = { custom: CustomNode };
const edgeTypes = { "custom-edge": CustomEdge };

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
        addEdge({ ...params, type: "custom-edge", label: "0" }, eds)
      ),
    [setEdges]
  );

  const createNode = (value: string) => {
    const result = nodes.find(
      ({ data }) => (data.label as string).trim() === value.trim()
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
      edges.filter(({ target, source }) => ![target, source].includes(id))
    );
    setNodes((nodes) => nodes.filter(({ data }) => data.label !== value));
  };

  useEffect(() => {
    console.log({ edges });
  }, [edges]);

  const addStates = (value: string) => {
    setState((states) => [...states, value]);
  };

  const removeState = (deletedState: string) => {
    if (states.length <= 2) {
      window.alert("No se pueden eliminar todos los estados");
      return;
    }

    setState((states) => states.filter((state) => state != deletedState));
    setEdges((edges) =>
      edges.filter(
        ({ label }) =>
          !(label as string)
            .split(",")
            .map((label) => label.trim())
            .includes(deletedState)
      )
    );
  };

  const handleUpdateEdge = (value: string[]) => {
    setEdges((edges) => {
      const index = edges.findIndex((edge) => edge.id === selectedEdge?.id);
      edges[index].label = value.join(",");
      return edges;
    });
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
      <div style={{ minHeight: "10vh", backgroundColor: "#ececec" }}>
        <ArdenResult edges={edges} nodes={nodes} />
      </div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#cecece",
          right: 4,
          marginTop: 4,
          padding: 18,
          borderRadius: 20,
          zIndex: 4,
        }}
      >
        {selection === "none" && (
          <>
            <h2>Estados</h2>

            <AddEdgeForm onPress={addStates} />
            <div
              style={{
                gap: 8,
                display: "flex",
                flexDirection: "column",
                paddingTop: 4,
                borderTopStyle: "dashed",
                borderTopWidth: 1,
                marginTop: 4,
              }}
            >
              {states.map((state) => (
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div>{state}</div>
                  <button onClick={() => removeState(state)}>Eliminar</button>
                </div>
              ))}
            </div>

            <h2>Nodos</h2>

            <AddEdgeForm onPress={createNode} />
            <div
              style={{
                gap: 8,
                display: "flex",
                flexDirection: "column",
                paddingTop: 4,
                borderTopStyle: "dashed",
                borderTopWidth: 1,
                marginTop: 4,
              }}
            >
              {nodes.map(({ data }) => (
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div>{data.label as string}</div>
                  <button
                    onClick={() => handleDeleteNode(data.label as string)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selection === "edge" && (
          <>
            <h2>Cambiar de estado</h2>
            <hr />
            <label>Selecciona el nuevo estado</label>
            <select
              style={{ width: "100%" }}
              multiple
              defaultValue={(selectedEdge?.label as string).split(",")}
              onChange={(e) =>
                handleUpdateEdge(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
            >
              {states.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </select>
          </>
        )}

        {selection === "node" && (
          <>
            <h2>Cambiar de nodo</h2>
            <hr />
            <label>Selecciona el nuevo valor del nodo</label>
            <br />
            <input
              style={{ width: "100%" }}
              defaultValue={selectedNode?.data.label as string}
              onChange={(e) => handleUpdateNode(e.target.value)}
            />
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
        >
          <Controls onFitView={handleMinimapSelection} />
          <MiniMap onClick={handleMinimapSelection} />
          <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
