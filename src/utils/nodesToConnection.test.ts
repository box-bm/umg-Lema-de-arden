import { Connection } from "../models/connection";
import { nodesToConnections } from "./nodesToConnection";

describe("Node to Connection util", () => {
  it("should get connection by node", () => {
    const connections = nodesToConnections(
      [
        {
          id: "1",
          type: "custom",
          position: { x: 100, y: 40 },
          data: { label: "q0" },
        },
        {
          id: "2",
          type: "custom",
          position: { x: 250, y: 40 },
          data: { label: "q1" },
        },
        {
          id: "3",
          type: "custom",
          position: { x: 400, y: 40 },
          data: { label: "q2" },
        },
      ],
      [
        {
          id: "e1-1",
          source: "1",
          target: "1",
          type: "custom-edge",
          sourceHandle: "out-top",
          targetHandle: "in",
          label: "0",
        },
        {
          id: "e2-2",
          source: "2",
          target: "2",
          type: "custom-edge",
          sourceHandle: "out-top",
          targetHandle: "in",
          label: "1",
        },
        {
          id: "e3-3",
          source: "3",
          target: "3",
          type: "custom-edge",
          sourceHandle: "out-top",
          targetHandle: "in",
          label: "0,1",
        },
        {
          id: "e1-2",
          source: "1",
          target: "2",
          type: "custom-edge",
          sourceHandle: "out-right",
          targetHandle: "in",
          label: "1",
        },
        {
          id: "e2-3",
          source: "2",
          target: "3",
          type: "custom-edge",
          sourceHandle: "out-right",
          targetHandle: "in",
          label: "0",
        },
      ]
    );

    expect(connections).toEqual([
      { from: "q0", to: "q0", using: "0" },
      {
        from: "q1",
        to: "q1",
        using: "1",
      },
      {
        from: "q2",
        to: "q2",
        using: "0",
      },
      {
        from: "q2",
        to: "q2",
        using: "1",
      },
      {
        from: "q0",
        to: "q1",
        using: "1",
      },
      {
        from: "q1",
        to: "q2",
        using: "0",
      },
    ] as Connection[]);
  });
});
