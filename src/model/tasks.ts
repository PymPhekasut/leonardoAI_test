import { Client } from "pg";
import { v4 as uuidv4 } from "uuid";

export class TaskServices {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  public async insertTask(task: Tasks): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO tasks (
        id, 
        account_id, 
        schedule_id, 
        start_time, 
        duration,
        type
        ) 
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const values = [
      id,
      task.account_id,
      task.schedule_id,
      task.start_time,
      task.duration,
      task.type,
    ];

    try {
      await this.client.query(query, values);
      return id;
    } catch (error) {
      throw error;
    }
  }

  public async listTasks(): Promise<Tasks[]> {
    const query = `SELECT * FROM tasks;`;
    try {
      const { rows } = await this.client.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  public async getTaskById(id: string): Promise<Tasks | null> {
    const query = `SELECT * FROM tasks WHERE id = $1`;
    try {
      const { rows } = await this.client.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  public async deleteTaskById(id: string) {
    const query = `DELETE FROM tasks WHERE id = $1`;
    try {
      return await this.client.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  public async updateTaskById(id: string, task: Tasks) {
    const values: any[] = [];
    let setClause = "";
    const { account_id, schedule_id, start_time, duration, type } = task;

    if (account_id !== undefined) {
      setClause += "account_id = $1, ";
      values.push(account_id);
    }

    if (schedule_id !== undefined) {
      setClause += "schedule_id = $" + (values.length + 1) + ", ";
      values.push(schedule_id);
    }

    if (start_time !== undefined) {
      setClause += "start_time = $" + (values.length + 1) + ", ";
      values.push(start_time);
    }

    if (duration !== undefined) {
      setClause += "duration = $" + (values.length + 1) + ", ";
      values.push(duration);
    }

    if (type !== undefined) {
      setClause += "type = $" + (values.length + 1) + ", ";
      values.push(type);
    }

    values.push(id);

    const query = `
    UPDATE tasks
    SET ${setClause.slice(0, -2)} 
    WHERE id = $${values.length};`;

    try {
      return await this.client.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}
