import { handler } from "../createSchedule";
import { createDBClient } from "../../../model/db";
import { ScheduleServices } from "../../../model/schedules";
import { response } from "../../../libs/response";

jest.mock("../../../model/db");
jest.mock("../../../model/schedules");
jest.mock("../../../libs/response");

const mockScheduleId = "02064d32-7109-487f-8aa0-97718eaef2aa";
const mockScheduleBody = {
  account_id: 101,
  agent_id: 44,
  start_time: "2024-06-01 09:00:00",
  end_time: "2024-06-01 17:00:00",
};

describe("handler", () => {
  let mockClient: jest.Mocked<any>;
  let mockScheduleServices: any;

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

  it("should return 201 and create schedule", async () => {
    // Mock the model and fn
    mockScheduleServices = {
      insertSchedule: jest.fn().mockResolvedValue(mockScheduleId),
    };
    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 201,
      body: JSON.stringify({ message: "Create schedule successfully.", id: mockScheduleId }),
    });
    const event = {
      body: mockScheduleBody,
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.insertSchedule).toHaveBeenCalledWith(mockScheduleBody);
    expect(response).toHaveBeenCalledWith(201, {
      message: "Create schedule successfully.",
      id: mockScheduleId,
    });
    expect(result).toEqual({
      statusCode: 201,
      body: JSON.stringify({ message: "Create schedule successfully.", id: mockScheduleId }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 500 if error occurs", async () => {
    const error = new Error("Database error");

    // Mock the model and fn
    mockScheduleServices = {
      insertSchedule: jest.fn().mockRejectedValue(error),
    };
    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    });
    const event = {
      body: mockScheduleBody,
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.insertSchedule).toHaveBeenCalledWith(mockScheduleBody);
    expect(response).toHaveBeenCalledWith(500, { error: error });
    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error }) });
    expect(mockClient.end).toHaveBeenCalled();
  });
});
