import { handler } from "../getTask";
import { createDBClient } from "../../../model/db";
import { TaskServices } from "../../../model/tasks";
import { response } from "../../../libs/response";

jest.mock("../../../model/db");
jest.mock("../../../model/tasks");
jest.mock("../../../libs/response");

const mockTask = {
  id: "14tg5g-cce9-453a-aa21-eee2fe2fb28e",
  account_id: 101,
  schedule_id: "b40df7ec-cce9-453a-aa21-eee2fe2fb28e",
  start_time: "2024-06-01 09:00:00",
  duration: 2,
  type: "work",
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
    // Mock the model and fn
    mockTaskServices = {
      getTaskById: jest.fn().mockResolvedValue(null),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found task.` }),
    });

    const event = {
      pathParameters: {
        id: mockTask.id,
      },
    };

    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.getTaskById).toHaveBeenCalled();
    expect(response).toHaveBeenCalledWith(404, { message: "Not found task." });
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found task.` }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 200 and task", async () => {
    // Mock the model and fn
    mockTaskServices = {
      getTaskById: jest.fn().mockResolvedValue(mockTask),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 200,
      body: JSON.stringify({ task: mockTask }),
    });
    const event = {
      pathParameters: {
        id: mockTask.id,
      },
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.getTaskById).toHaveBeenCalledWith(mockTask.id);
    expect(response).toHaveBeenCalledWith(200, { task: mockTask });
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ task: mockTask }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 500 if error occurs", async () => {
    const error = new Error("Database error");
    // Mock the model and fn
    mockTaskServices = {
      getTaskById: jest.fn().mockRejectedValue(error),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error }),
    });
    const event = {
      pathParameters: {
        id: mockTask.id,
      },
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.getTaskById).toHaveBeenCalledWith(mockTask.id);
    expect(response).toHaveBeenCalledWith(500, error);
    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error }) });
    expect(mockClient.end).toHaveBeenCalled();
  });
});
