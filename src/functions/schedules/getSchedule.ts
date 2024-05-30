import { response } from "../../libs/response";
import { createDBClient } from "../../model/db";
import { ScheduleServices } from "../../model/schedules";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  const client = createDBClient();
  const scheduleId = event.pathParameters?.id as string;

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
    // Return schedule if found in db
    return response(200, { schedules: getSchedule });
  } catch (error) {
    return response(500, error);
  } finally {
    await client.end();
  }
};
