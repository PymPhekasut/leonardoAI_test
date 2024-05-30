import { response } from "../../libs/response";
import { createDBClient } from "../../model/db";
import { ScheduleServices } from "../../model/schedules";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const client = createDBClient();
  try {
    // Connect to db
    await client.connect();
    // List schedule to db
    const scheduleServices = new ScheduleServices(client);
    const listAllSchedules = await scheduleServices.listSchedules();
    // If schedule not found in db, handle error response
    if (!listAllSchedules || listAllSchedules.length === 0) {
      return response(404, { message: `Not found schedule.` });
    }
    // Return list of schedules if found in db
    return response(200, { schedules: listAllSchedules });
  } catch (error) {
    return response(500, error);
  } finally {
    await client.end();
  }
};
