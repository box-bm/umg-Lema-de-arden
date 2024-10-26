import { Connection } from "../models/connection";
import { identifyEquationPatterns } from "./identifyEquationPattern";
import { makeEquations } from "./makeEquation";
import { replaceValues } from "./replaceValues";
import { splitEquations } from "./splitEquation";

export const resolveArden = (connections: Connection[]): string => {
  const equations = makeEquations(connections);
  const equationParts = splitEquations(equations);
  const patterns = identifyEquationPatterns(equationParts);

  const newValue = replaceValues(patterns);
  return newValue;
};
