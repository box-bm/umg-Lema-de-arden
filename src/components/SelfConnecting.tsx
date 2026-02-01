import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  type EdgeProps,
} from "@xyflow/react";

export default function SelfConnecting(props: EdgeProps) {
  if (props.source !== props.target) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, markerEnd, label, targetX, targetY, id } = props;

  const labelX = targetX - 30;
  const labelY = sourceY - 22; // arriba del nodo

  const radiusX = (sourceX - targetX) * 1;
  const radiusY = 22;
  const edgePath = `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
    targetX + 2
  } ${targetY}`;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} id={id} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          className="edge-label-renderer__custom-edge nodrag nopan"
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
