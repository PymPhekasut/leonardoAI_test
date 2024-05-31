import { response } from "../../libs/response";
import { TaskServices } from "../../model/tasks";
import { createDBClient } from "../../model/db";
import { APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  const body: Tasks = JSON.parse(event.body!);
  const client = createDBClient();

  try {
    // Connect to db
    await client.connect();
    // Insert task to db
    const taskServices = new TaskServices(client);
    const newTaskId = await taskServices.insertTask(body);
    return response(201, { message: "Create task successfully.", id: newTaskId });
  } catch (error) {
    return response(500, { error: error });
  } finally {
    await client.end();
  }
};
