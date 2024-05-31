import { handler } from "../createTask";
import { createDBClient } from "../../../model/db";
import { TaskServices } from "../../../model/tasks";
import { response } from "../../../libs/response";

jest.mock("../../../model/db");
jest.mock("../../../model/tasks");
jest.mock("../../../libs/response");

const mockTaskId = "14tg5g-cce9-453a-aa21-eee2fe2fb28e";
const mockTaskBody = {
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

  it("should return 201 and create task", async () => {
    // Mock the model and fn
    mockTaskServices = {
      insertTask: jest.fn().mockResolvedValue(mockTaskId),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 201,
      body: JSON.stringify({ message: "Create task successfully.", id: mockTaskId }),
    });
    const event = {
      body: JSON.stringify(mockTaskBody),
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.insertTask).toHaveBeenCalledWith(mockTaskBody);
    expect(response).toHaveBeenCalledWith(201, {
      message: "Create task successfully.",
      id: mockTaskId,
    });
    expect(result).toEqual({
      statusCode: 201,
      body: JSON.stringify({ message: "Create task successfully.", id: mockTaskId }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 500 if error occurs", async () => {
    const error = new Error("Database error");

    // Mock the model and fn
    mockTaskServices = {
      insertTask: jest.fn().mockRejectedValue(error),
    };
    (TaskServices as jest.Mock).mockImplementation(() => mockTaskServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    });
    const event = {
      body: JSON.stringify(mockTaskBody),
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(TaskServices).toHaveBeenCalledWith(mockClient);
    expect(mockTaskServices.insertTask).toHaveBeenCalledWith(mockTaskBody);
    expect(response).toHaveBeenCalledWith(500, { error: error });
    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error }) });
    expect(mockClient.end).toHaveBeenCalled();
  });
});
