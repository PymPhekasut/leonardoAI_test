import { response } from "../../libs/response";
import { ScheduleServices } from "../../model/schedules";
import { createDBClient } from "../../model/db";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  const client = createDBClient();
  const scheduleId = event.pathParameters?.id as string;
  const body: Schedules = event.body!;

  try {
    // Connect to db
    await client.connect();
    // Get schedule to db
    const scheduleServices = new ScheduleServices(client);
    const getSchedule = await scheduleServices.getScheduleById(scheduleId);
    // If schedule not found in db, handle error response
    if (!getSchedule) {
      return response(404, { message: `Not found schedule.` });
    }
    // Update schedule
    await scheduleServices.updateScheduleById(scheduleId, body);
    return response(200, { message: `Updated schedule successfully.` });
  } catch (error) {
    return response(500, error);
  } finally {
    await client.end();
  }
};
