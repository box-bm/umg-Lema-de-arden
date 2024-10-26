export interface EquationParts {
  value: null | string;
  data: {
    using: string;
    state: string;
  }[];
}

export const splitEquations = (equations: string[]): EquationParts[] => {
  return equations.map((equation) => splitEquation(equation));
};

export const splitEquation = (equation: string): EquationParts => {
  const regex = /(\w+)=([\d]+)\((\w+)\)(?:\+([\d]+)\((\w+)\))*/g;

  const result: EquationParts = {
    value: null,
    data: [],
  };

  let match;
  while ((match = regex.exec(equation)) !== null) {
    if (!result.value) {
      result.value = match[1];
    }
    result.data.push({ using: match[2], state: match[3] });

    for (let i = 4; i < match.length; i += 2) {
      if (match[i] && match[i + 1]) {
        result.data.push({
          using: match[i],
          state: match[i + 1],
        });
      }
    }
  }

  return result;
};
