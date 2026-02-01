import { EquationPattern } from "./identifyEquationPattern";

export const replaceValues = (replacements: EquationPattern[]) => {
  if (replacements.length === 0) return "";
  // Usamos el primer elemento del array como punto de partida.
  const startValue = replacements[0].value;
  let result = replacements.find((item) => item.value === startValue)?.equation;
  if (!result) throw new Error("result doesnt exist");

  // Función para realizar el reemplazo de un valor específico en una cadena.
  const replaceEquation = (equation: string, value: string, equal: string) => {
    const pattern = new RegExp(`\\b${value}\\b`, "g"); // Expresión regular para buscar el valor exacto
    return equation.replace(pattern, equal);
  };

  // Reemplazar cada valor en `result` por su ecuación hasta resolver todos los valores referenciados.
  replacements.forEach(({ value, equal }) => {
    while (result?.includes(value)) {
      result = replaceEquation(result, value, equal);
    }
  });

  const equationParts = result.split("=");
  return `${startValue}=${equationParts[1]}`;
};
