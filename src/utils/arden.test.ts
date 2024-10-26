import { Connection } from "../models/connection";
import { resolveArden } from "./arden";

describe("arden tests", () => {
  it("should resolve equation", () => {
    const connections: Connection[] = [
      { from: "q0", to: "q0", using: "0" },
      { from: "q0", to: "q1", using: "1" },
      { from: "q1", to: "q1", using: "1" },
      { from: "q1", to: "q2", using: "0" },
      { from: "q2", to: "q2", using: "1" },
      { from: "q2", to: "q2", using: "0" },
    ];

    const response = resolveArden(connections);
    expect(response).toBe("q0=(0)*+1((1)*+0((1+0)*))");
  });

  it("should resolve equation", () => {
    const connections: Connection[] = [
      { from: "q0", to: "q0", using: "0" },
      { from: "q0", to: "q0", using: "1" },
      { from: "q0", to: "q1", using: "0" },
      { from: "q1", to: "q2", using: "1" },
    ];

    const response = resolveArden(connections);
    expect(response).toBe("q0=(0)*+0(1(q2))");
  });

  it("should resolve equation", () => {
    const connections: Connection[] = [
      { from: "A", to: "A", using: "0" },
      { from: "A", to: "B", using: "1" },
      { from: "B", to: "C", using: "1" },
      { from: "C", to: "C", using: "0" },
    ];

    const response = resolveArden(connections);
    expect(response).toBe("q0=(0)*+0(1(q2))");
  });
});
