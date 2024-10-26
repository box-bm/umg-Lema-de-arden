import { EquationParts } from "./splitEquation";

export interface EquationPattern {
  value: string;
  equal: string;
  equation: string;
}

export const identifyEquationPatterns = (
  patterns: EquationParts[]
): EquationPattern[] => {
  return patterns.map((pattern) => identifyPatterns(pattern));
};

export const identifyPatterns = ({
  data,
  value,
}: EquationParts): EquationPattern => {
  if (!value) throw new Error("Theres no value");

  const samevalue = data.filter(({ state }) => value === state);

  const equations: string[] = [];
  if (samevalue.length > 0) {
    const values = samevalue.map(({ using }) => using).join("+");
    equations.push(`(${values})*`);
  }

  const differentValues = data.filter(({ state }) => value !== state);
  if (differentValues.length > 0) {
    equations.push(
      ...differentValues.map(({ state, using }) => `${using}(${state})`)
    );
  }

  const equal = equations.join("+");

  return {
    equation: `${value}=${equal}`,
    equal,
    value,
  };
};
