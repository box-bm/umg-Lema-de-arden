import { useState } from "react";

interface Props {
  onPress: (value: string) => void;
}

const AddEdgeForm = ({ onPress }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value) onPress(value);
  };

  return (
    <>
      <input defaultValue={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Agregar</button>
    </>
  );
};

export default AddEdgeForm;
