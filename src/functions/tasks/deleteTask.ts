import { response } from "../../libs/response";
import { createDBClient } from "../../model/db";
import { TaskServices } from "../../model/tasks";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  const client = createDBClient();
  const taskId = event.pathParameters?.id as string;

  try {
    // Connect to db
    await client.connect();
    // Get task to db
    const taskServices = new TaskServices(client);
    const getTask = await taskServices.getTaskById(taskId);
    // If task not found in db, handle error response
    if (!getTask) {
      return response(404, { message: `Not found task.` });
    }
    // Delete task
    await taskServices.deleteTaskById(taskId);
    return response(200, { message: "Task is deleted successfully." });
  } catch (error) {
    return response(500, error);
  } finally {
    await client.end();
  }
};
