import { useCallback, useEffect, useState } from "react";

interface Props {
  onPress: (value: string) => void;
  placeholder?: string;
}

const AddEdgeForm = ({ onPress }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (value) {
      onPress(value);
      setValue("");
    }
  }, [onPress, value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        disabled={!value}
        className={`success ${!value ? "disabled" : ""}`}
        onClick={handleSubmit}
      >
        Agregar
      </button>
    </>
  );
};

export default AddEdgeForm;
