import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  MarkerType,
} from "@xyflow/react";

export default function CustomEdge(props: EdgeProps) {
  if (props.source !== props.target) {
    const newProps = {
      ...props,
      sourceX: props.sourceX - 2,
      targetX: props.targetX - 2,
    };
    return <BezierEdge {...newProps} markerEnd={MarkerType.Arrow} />;
  }

  const { sourceX, sourceY, targetX, targetY, id } = props;
  const radiusX = 30;
  const radiusY = (sourceY - targetY) * 1;
  // notice here
  const edgePath = `M ${sourceX} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX} ${targetY}`;

  const [_, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} className="react-flow__edge-path" path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(20px, -40px) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {props.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
