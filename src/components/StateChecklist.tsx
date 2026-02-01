import React, { useEffect } from "react";
import { Edge } from "@xyflow/react";

interface StateChecklistProps {
  states: string[];
  edge: Edge;
  onStateChanges: (state: string[]) => boolean;
}

/*
 * this asigns multiple states to a node
 */
const StateChecklist: React.FC<StateChecklistProps> = ({
  states,
  edge,
  onStateChanges,
}) => {
  const [selectedStates, setSelectedStates] = React.useState<string[]>([]);

  useEffect(() => {
    const edgeStates = edge.label?.toString().split(",") || [];
    setSelectedStates(edgeStates);
  }, [edge]);

  const handleStateChange = (state: string) => {
    let updatedStates: string[];
    if (selectedStates.includes(state)) {
      updatedStates = selectedStates.filter((s) => s !== state);
    } else {
      updatedStates = [...selectedStates, state];
    }
    const isValid = onStateChanges(updatedStates);
    if (isValid) setSelectedStates(updatedStates);
  };

  return (
    <div>
      {states.map((state) => (
        <div key={state}>
          <input
            type="checkbox"
            id={state}
            name={state}
            checked={selectedStates.includes(state)}
            onChange={() => handleStateChange(state)}
          />
          <label htmlFor={state}>{state}</label>
        </div>
      ))}
    </div>
  );
};

export default StateChecklist;
