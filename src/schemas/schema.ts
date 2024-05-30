export const scheduleSchema = {
  type: "object",
  properties: {
    account_id: { type: "number" },
    agent_id: { type: "number" },
    start_time: { type: "string" },
    end_time: { type: "string" },
  },
  required: [],
};

export const taskSchema = {
  type: "object",
  properties: {
    account_id: { type: "number" },
    schedule_id: { type: "string" },
    start_time: { type: "string" },
    duration: { type: "number" },
    type: { type: "string" },
  },
  required: [],
};
