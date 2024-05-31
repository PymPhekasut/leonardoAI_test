import { handler } from "../updateTask";
import { createDBClient } from "../../../model/db";
import { TaskServices } from "../../../model/tasks";
import { response } from "../../../libs/response";

jest.mock("../../../model/db");
jest.mock("../../../model/tasks");
jest.mock("../../../libs/response");

const mockTasks = {
  id: "14tg5g-cce9-453a-aa21-eee2fe2fb28e",
  account_id: 101,
  schedule_id: "b40df7ec-cce9-453a-aa21-eee2fe2fb28e",
  start_time: "2024-06-01 09:00:00",
  duration: 2,
  type: "work",
};

const mockTasksBody = {
  account_id: 202,
  schedule_id: "b40df7ec-cce9-453a-aa21-eee2fe2fb28e",
  start_time: "2024-06-01 10:00:00",
  duration: 1,
  type: "break",
};

describe("handler", () => {
  let mockClient: jest.Mocked<any>;
  let mockTaskServices: any;

  beforeEach(() => {
    // Mock createDBClient and its return as mockClient
    mockClient = {
      connect: jest.fn(),
      end: jest.fn(),
    } as unknown as jest.Mocked<any>;
    (createDBClient as jest.Mock).mockReturnValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 404 if no task found", async () => {
    // Set up mock task services
    mockTaskServices = {
      getTaskById: jest.fn().mockResolvedValue(null),
      updateTaskById: jest.fn(),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);
    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found task.` }),
    });

    const event = {
      pathParameters: {
        id: mockTasks.id,
      },
      body: JSON.stringify(mockTasksBody),
    };

    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.getTaskById).toHaveBeenCalledWith(mockTasks.id);
    expect(response).toHaveBeenCalledWith(404, { message: "Not found task." });
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found task.` }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 200 and update task", async () => {
    // Mock the model and fn
    mockTaskServices = {
      getTaskById: jest.fn().mockResolvedValue(mockTasks),
      updateTaskById: jest.fn(),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 200,
      body: JSON.stringify({ message: "Updated task successfully." }),
    });
    const event = {
      pathParameters: {
        id: mockTasks.id,
      },
      body: JSON.stringify(mockTasksBody),
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.getTaskById).toHaveBeenCalledWith(mockTasks.id);
    expect(mockTaskServices.updateTaskById).toHaveBeenCalledWith(mockTasks.id, mockTasksBody);

    expect(response).toHaveBeenCalledWith(200, {
      message: "Updated task successfully.",
    });
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: "Updated task successfully." }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 500 if error occurs", async () => {
    const error = new Error("Database error");
    // Mock the model and fn
    mockTaskServices = {
      getTaskById: jest.fn().mockResolvedValue(mockTasks),
      updateTaskById: jest.fn().mockRejectedValue(error),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    });

    const event = {
      pathParameters: {
        id: mockTasks.id,
      },
      body: JSON.stringify(mockTasksBody),
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.getTaskById).toHaveBeenCalledWith(mockTasks.id);
    expect(mockTaskServices.updateTaskById).toHaveBeenCalledWith(mockTasks.id, mockTasksBody);
    expect(response).toHaveBeenCalledWith(500, error);
    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error: error }) });
    expect(mockClient.end).toHaveBeenCalled();
  });
});
