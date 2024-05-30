import { handler } from "../listSchedules";
import { createDBClient } from "../../../model/db";
import { ScheduleServices } from "../../../model/schedules";
import { response } from "../../../libs/response";

jest.mock("../../../model/db");
jest.mock("../../../model/schedules");
jest.mock("../../../libs/response");

const mockSchedules = [
  {
    id: "02064d32-7109-487f-8aa0-97718eaef2aa",
    account_id: 101,
    agent_id: 44,
    start_time: "2024-06-01 09:00:00",
    end_time: "2024-06-01 17:00:00",
  },
];

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

  it("should return 404 if no schedules found", async () => {
    // Mock the model and fn
    mockScheduleServices = {
      listSchedules: jest.fn().mockResolvedValue(jest.fn().mockResolvedValue([])),
    };
    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 404,
      body: JSON.stringify({ message: `Not found schedule.` }),
    });

    const result = await handler();
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.listSchedules).toHaveBeenCalled();
    expect(response).toHaveBeenCalledWith(404, { message: "Not found schedule." });
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: "Not found schedule." }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 200 with list of schedules", async () => {
    // Mock the model and fn
    mockScheduleServices = {
      listSchedules: jest.fn().mockResolvedValue(mockSchedules),
    };
    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);

    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 200,
      body: JSON.stringify({ schedules: mockSchedules }),
    });

    const result = await handler();
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.listSchedules).toHaveBeenCalled();
    expect(response).toHaveBeenCalledWith(200, { schedules: mockSchedules });
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ schedules: mockSchedules }),
    });
    expect(mockClient.end).toHaveBeenCalled();
  });

  it("should return 500 if error occurs", async () => {
    const error = new Error("Database error");
    // Mock the model and fn
    mockScheduleServices = {
      listSchedules: jest.fn().mockRejectedValue(error),
    };
    (ScheduleServices as jest.Mock).mockImplementation(() => mockScheduleServices);
    // Mock its response what should be returned
    (response as jest.Mock).mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error }),
    });

    const result = await handler();
    expect(mockClient.connect).toHaveBeenCalled();
    expect(ScheduleServices).toHaveBeenCalledWith(mockClient);
    expect(mockScheduleServices.listSchedules).toHaveBeenCalled();
    expect(response).toHaveBeenCalledWith(500, error);
    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error }) });
    expect(mockClient.end).toHaveBeenCalled();
  });
});
