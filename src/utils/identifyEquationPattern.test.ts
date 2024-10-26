import { identifyPatterns } from "./identifyEquationPattern";

describe("identify patterns", () => {
  it("should identify pattern", () => {
    const result = identifyPatterns({
      value: "q0",
      data: [
        { using: "0", state: "q0" },
        { using: "1", state: "q1" },
      ],
    });

    expect(result).toEqual({
      value: "q0",
      equation: "q0=(0)*+1(q1)",
      equal: "(0)*+1(q1)",
    });
  });

  it("should identify pattern when has no repeated values", () => {
    const result = identifyPatterns({
      value: "q0",
      data: [
        { using: "0", state: "q2" },
        { using: "1", state: "q1" },
      ],
    });

    expect(result).toEqual({
      value: "q0",
      equation: "q0=0(q2)+1(q1)",
      equal: "0(q2)+1(q1)",
    });
  });

  it("should identify pattern with same value", () => {
    const result = identifyPatterns({
      value: "q0",
      data: [
        { using: "0", state: "q0" },
        { using: "1", state: "q0" },
      ],
    });

    expect(result).toEqual({
      value: "q0",
      equation: "q0=(0+1)*",
      equal: "(0+1)*",
    });
  });
});
