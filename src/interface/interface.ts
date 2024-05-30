interface Schedules {
  id?: string;
  account_id: number;
  agent_id: number;
  start_time: string;
  end_time: string;
}

interface Tasks {
  id?: string;
  account_id: number;
  schedule_id: string;
  start_time: string;
  duration: number;
  type: string;
}
