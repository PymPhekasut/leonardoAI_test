import { TaskServices } from "../../model/tasks";
import { response } from "../../libs/response";
import { createDBClient } from "../../model/db";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  const client = createDBClient();
  const taskId = event.pathParameters?.id as string;
  const body: Tasks = event.body!;

  try {
    // Connect to db
    await client.connect();
    // Get task to db
    const taskServices = new TaskServices(client);
    const getTaskById = await taskServices.getTaskById(taskId);
    // If task not found in db, handle error response
    if (!getTaskById) {
      return response(404, { message: `Not found task.` });
    }
    // Update task
    await taskServices.updateTaskById(taskId, body);
    return response(200, { message: `Updated task successfully.` });
  } catch (error) {
    return response(500, error);
  } finally {
    await client.end();
  }
};
