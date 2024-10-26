import { replaceValues } from "./replaceValues";

describe("replaceValues", () => {
  it("Replace patterns", () => {
    const result = replaceValues([
      {
        equal: "1(q1)+0(q2)",
        equation: "q0=(0)*+1(q1)",
        value: "q0",
      },
      {
        equal: "(1)*+0(q2)",
        equation: "q1=(1)*+0(q2)",
        value: "q1",
      },
      {
        equal: "(1+0)*",
        equation: "q2=(1+0)*",
        value: "q2",
      },
    ]);

    expect(result).toBe("q0=(0)*+1((1)*+0((1+0)*))");
  });
});
