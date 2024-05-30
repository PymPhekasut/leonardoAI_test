import { scheduleSchema } from "../schemas/schema";

export default {
  createSchedule: {
    handler: `src/functions/schedules/createSchedule.handler`,
    events: [
      {
        http: {
          method: "post",
          path: "schedules",
          request: {
            schemas: {
              "application/json": scheduleSchema,
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
          path: "schedules",
        },
      },
    ],
  },
  getScheduleById: {
    handler: `src/functions/schedules/getSchedule.handler`,
    events: [
      {
        http: {
          method: "get",
          path: "schedules/{id}",
        },
      },
    ],
  },
  updateScheduleById: {
    handler: `src/functions/schedules/updateSchedule.handler`,
    events: [
      {
        http: {
          method: "put",
          path: "schedules/{id}",
        },
      },
    ],
  },
  deleteScheduleById: {
    handler: `src/functions/schedules/deleteSchedule.handler`,
    events: [
      {
        http: {
          method: "delete",
          path: "schedules/{id}",
        },
      },
    ],
  },
};
