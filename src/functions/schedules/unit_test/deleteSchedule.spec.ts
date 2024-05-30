import { handler } from "../deleteSchedule";
import { createDBClient } from "../../../model/db";
import { ScheduleServices } from "../../../model/schedules";
import { response } from "../../../libs/response";

jest.mock("../../../model/db");
jest.mock("../../../model/schedules");
jest.mock("../../../libs/response");

const mockScheduleId = "02064d32-7109-487f-8aa0-97718eaef2aa";
const mockSchedule = {
  id: "02064d32-7109-487f-8aa0-97718eaef2aa",
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

  it("should return 404 if no schedule found", async () => {
    // Set up mock schedule services
    mockScheduleServices = {
      getScheduleById: jest.fn().mockResolvedValue(null),
      deleteScheduleById: jest.fn(),
    };
    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);
    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found schedule.` }),
    });

    const event = {
      pathParameters: {
        id: mockScheduleId,
      },
    };

    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.getScheduleById).toHaveBeenCalledWith(mockScheduleId);
    expect(response).toHaveBeenCalledWith(404, { message: "Not found schedule." });
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found schedule.` }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 200 and delete schedule", async () => {
    // Set up mock schedule services
    mockScheduleServices = {
      getScheduleById: jest.fn().mockResolvedValue(mockSchedule),
      deleteScheduleById: jest.fn(),
    };

    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);
    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 200,
      body: JSON.stringify({ message: "Schedule is deleted successfully." }),
    });
    const event = {
      pathParameters: {
        id: mockSchedule.id,
      },
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.getScheduleById).toHaveBeenCalledWith(mockSchedule.id);
    expect(mockScheduleServices.deleteScheduleById).toHaveBeenCalledWith(mockSchedule.id);
    expect(response).toHaveBeenCalledWith(200, { message: "Schedule is deleted successfully." });
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: "Schedule is deleted successfully." }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 500 if error occurs", async () => {
    const error = new Error("Database error");

    // Set up mock schedule services
    mockScheduleServices = {
      getScheduleById: jest.fn().mockResolvedValue(mockSchedule),
      deleteScheduleById: jest.fn().mockRejectedValue(error),
    };

    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);
    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error }),
    });
    const event = {
      pathParameters: {
        id: mockSchedule.id,
      },
    };
    const result = await handler(event);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.getScheduleById).toHaveBeenCalledWith(mockSchedule.id);
    expect(mockScheduleServices.deleteScheduleById).toHaveBeenCalledWith(mockSchedule.id);
    expect(response).toHaveBeenCalledWith(500, error);
    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error }) });
    expect(mockClient.end).toHaveBeenCalled();
  });
});
