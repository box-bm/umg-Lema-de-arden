import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

function CustomNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  console.log(data);

  return (
    <div
      style={{
        minWidth: 80,
        height: "50px",
        border: "1px solid #eee",
        padding: "5px",
        borderRadius: "5px",
        background: "white",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="in"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="out-top"
        isConnectable={isConnectable}
      />
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          display: "flex",
          height: "100%",
        }}
      >
        <p>{data.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="out-right"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;
