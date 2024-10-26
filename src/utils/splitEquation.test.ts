import { splitEquation } from "./splitEquation";

describe("arden tests", () => {
  it("should split a equation", () => {
    const result = splitEquation("q0=0(q0)+1(q1)");

    expect(result).toEqual({
      value: "q0",
      data: [
        { using: "0", state: "q0" },
        { using: "1", state: "q1" },
      ],
    });
  });
});
