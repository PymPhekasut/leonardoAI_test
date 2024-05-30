import schema from "../schemas/schema";

export default {
  createSchedule: {
    handler: `src/functions/schedules/createSchedule.handler`,
    events: [
      {
        http: {
          method: "post",
          path: "hello",
          request: {
            schemas: {
              "application/json": schema,
            },
          },
        },
      },
    ],
  },
  listSchedules: {
    handler: `src/functions/schedules/listSchedules.handler`,
    events: [
      {
        http: {
          method: "get",
          path: "hello",
          request: {},
        },
      },
    ],
  },
};
