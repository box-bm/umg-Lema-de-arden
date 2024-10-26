import { Connection } from "../models/connection";
import { makeEquations } from "./makeEquation";

describe("makeEquations", () => {
  it("should get equations", () => {
    const connections: Connection[] = [
      { from: "q0", to: "q0", using: "0" },
      { from: "q0", to: "q1", using: "1" },
      { from: "q1", to: "q1", using: "1" },
      { from: "q1", to: "q2", using: "0" },
      { from: "q2", to: "q2", using: "1" },
      { from: "q2", to: "q2", using: "0" },
    ];

    const response = makeEquations(connections);

    expect(response).toEqual([
      "q0=0(q0)+1(q1)",
      "q1=1(q1)+0(q2)",
      "q2=1(q2)+0(q2)",
    ]);
  });
});
