import { response } from "../../libs/response";
import { ScheduleServices } from "../../model/schedules";
import { createDBClient } from "../../model/db";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  const body: Schedules = JSON.parse(event.body!);
  const client = createDBClient();

  try {
    // Connect to db
    await client.connect();
    // Insert schedule to db
    const scheduleServices = new ScheduleServices(client);
    const newScheduleId = await scheduleServices.insertSchedule(body);
    return response(201, { message: "Create schedule successfully.", id: newScheduleId });
  } catch (error) {
    return response(500, { error });
  } finally {
    await client.end();
  }
};
