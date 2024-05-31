import { Client } from "pg";
import { v4 as uuidv4 } from "uuid";

export class ScheduleServices {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  public async insertSchedule(schedules: Schedules): Promise<string> {
    const id = uuidv4();
    const query = `
    INSERT INTO schedules (
      id, 
      account_id, 
      agent_id, 
      start_time, 
      end_time
      ) 
    VALUES ($1, $2, $3, $4, $5);
  `;
    const values = [
      id,
      schedules.account_id,
      schedules.agent_id,
      schedules.start_time,
      schedules.end_time,
    ];

    try {
      await this.client.query(query, values);
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async listSchedules(): Promise<Schedules[]> {
    const query = `SELECT * FROM schedules;`;
    try {
      const { rows } = await this.client.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  public async getScheduleById(id: string): Promise<Schedules | null> {
    const query = `SELECT * FROM schedules WHERE id = $1`;
    try {
      const { rows } = await this.client.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  public async deleteScheduleById(id: string) {
    const query = `DELETE FROM schedules WHERE id = $1`;
    try {
      return await this.client.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  public async updateScheduleById(id: string, schedules: Schedules) {
    const values: any[] = [];
    let setClause = "";
    const { account_id, agent_id, start_time, end_time } = schedules;

    if (account_id !== undefined) {
      setClause += "account_id = $1, ";
      values.push(account_id);
    }

    if (agent_id !== undefined) {
      setClause += "agent_id = $" + (values.length + 1) + ", ";
      values.push(agent_id);
    }

    if (start_time !== undefined) {
      setClause += "start_time = $" + (values.length + 1) + ", ";
      values.push(start_time);
    }

    if (end_time !== undefined) {
      setClause += "end_time = $" + (values.length + 1) + ", ";
      values.push(end_time);
    }
    values.push(id);

    const query = `
      UPDATE schedules
      SET ${setClause.slice(0, -2)} 
      WHERE id = $${values.length};`;

    try {
      return await this.client.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}
