import { Client } from "pg";
import { createDBClient } from "./db";
import { ScheduleServices } from "./schedules";
import { TaskServices } from "./tasks";

const scheduleBody = {
  account_id: 101,
  agent_id: 44,
  start_time: "2024-06-01 09:00:00",
  end_time: "2024-06-01 17:00:00",
};

const mockTaskBody = {
  account_id: 101,
  start_time: "2024-06-01 09:00:00",
  duration: 2,
  type: "work",
};

describe("ScheduleServices", () => {
  let client: Client;
  let scheduleServices: ScheduleServices;
  let id: string = "";

  beforeAll(async () => {
    client = createDBClient();
    await client.connect();
    scheduleServices = new ScheduleServices(client);

    // Insert schedule
    id = await scheduleServices.insertSchedule(scheduleBody);
  });

  afterAll(async () => {
    // Delete schedule by id after test
    await client.query(`DELETE FROM schedules`);
    await client.end();
  });

  it("list schedules and it should include the new inserted schedule", async () => {
    const listSchedules = await scheduleServices.listSchedules();
    expect(listSchedules).toContainEqual({
      ...scheduleBody,
      id: id,
      start_time: formatDateTime(scheduleBody.start_time),
      end_time: formatDateTime(scheduleBody.end_time),
    });
  });

  it("get schedule by id if it was created successfully", async () => {
    const getSchedule = await scheduleServices.getScheduleById(id);
    expect(getSchedule).toEqual({
      ...scheduleBody,
      id: id,
      start_time: formatDateTime(scheduleBody.start_time),
      end_time: formatDateTime(scheduleBody.end_time),
    });
  });

  it("update and get schedule by id", async () => {
    const updateScheduleBody = {
      account_id: 202,
      agent_id: 55,
      start_time: "2024-06-01 10:00:00",
      end_time: "2024-06-01 18:00:00",
    };
    await scheduleServices.updateScheduleById(id, updateScheduleBody);
    expect(await scheduleServices.getScheduleById(id)).toEqual({
      ...updateScheduleBody,
      id: id,
      start_time: formatDateTime("2024-06-01 10:00:00"),
      end_time: formatDateTime("2024-06-01 18:00:00"),
    });
  });

  it("delete schedule by id", async () => {
    await scheduleServices.deleteScheduleById(id);
    expect(await scheduleServices.getScheduleById(id)).toBe(undefined);
  });
});

describe("TaskServices", () => {
  let client: Client;
  let scheduleServices: ScheduleServices;
  let taskServices: TaskServices;
  let schedule_id: string = "";
  let id: string = "";

  beforeAll(async () => {
    client = createDBClient();
    await client.connect();
    scheduleServices = new ScheduleServices(client);
    taskServices = new TaskServices(client);

    // Insert schedule for assinging to task
    schedule_id = await scheduleServices.insertSchedule(scheduleBody);
    id = await taskServices.insertTask({ ...mockTaskBody, schedule_id: schedule_id });
  });

  afterAll(async () => {
    // Delete schedule and task by id after test
    await client.query(`DELETE FROM schedules`);
    await client.query(`DELETE FROM tasks`);
    await client.end();
  });

  it("list tasks and it should include the new inserted tasks", async () => {
    const listTasks = await taskServices.listTasks();
    expect(listTasks).toContainEqual({
      ...mockTaskBody,
      id: id,
      schedule_id: schedule_id,
      start_time: formatDateTime(mockTaskBody.start_time),
    });
  });

  it("get task by id if it was created successfully", async () => {
    const getTask = await taskServices.getTaskById(id);
    expect(getTask).toEqual({
      ...mockTaskBody,
      id: id,
      schedule_id: schedule_id,
      start_time: formatDateTime(mockTaskBody.start_time),
    });
  });

  it("update and get task by id", async () => {
    const updateTaskBody = {
      schedule_id: schedule_id,
      account_id: 222,
      start_time: "2024-06-01 11:00:00",
      duration: 2,
      type: "break",
    };
    await taskServices.updateTaskById(id, updateTaskBody);
    expect(await taskServices.getTaskById(id)).toEqual({
      ...updateTaskBody,
      id: id,
      start_time: formatDateTime(updateTaskBody.start_time),
    });
  });

  it("delete taske by id", async () => {
    await taskServices.deleteTaskById(id);
    expect(await taskServices.getTaskById(id)).toBe(undefined);
  });
});

// Format date-time strings
function formatDateTime(dateTimeString: string): Date {
  return new Date(dateTimeString.replace(" ", "T") + "Z");
}
