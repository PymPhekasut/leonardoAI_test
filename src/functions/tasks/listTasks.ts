import { response } from "../../libs/response";
import { createDBClient } from "../../model/db";
import { TaskServices } from "../../model/tasks";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const client = createDBClient();

  try {
    // Connect to db
    await client.connect();
    // List task to db
    const taskServices = new TaskServices(client);
    const listAllTasks = await taskServices.listTasks();
    // If task not found in db, handle error response
    if (!listAllTasks || listAllTasks.length === 0) {
      return response(404, { message: `Not found task.` });
    }
    // Return list of task if found in db
    return response(200, { tasks: listAllTasks });
  } catch (error) {
    return response(500, error);
  } finally {
    await client.end();
  }
};
