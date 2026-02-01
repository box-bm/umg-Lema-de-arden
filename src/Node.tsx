import { Handle, NodeProps, Position } from "@xyflow/react";

interface CustomNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

function CustomNode({ data, isConnectable, selected }: CustomNodeProps) {
  return (
    <>
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
      <div className={`custom-node ${selected ? "selected" : ""}`}>
        <p>{data.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="out-right"
        isConnectable={isConnectable}
      />
    </>
  );
}

export default CustomNode;
