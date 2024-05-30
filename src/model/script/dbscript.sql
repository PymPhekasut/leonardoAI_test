


CREATE TABLE schedules
(
	id VARCHAR(36) PRIMARY KEY,
	account_id INT NOT NULL,
	agent_id INT NOT NULL,
	start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC+10', CURRENT_TIMESTAMP),
	end_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC+10', CURRENT_TIMESTAMP)
);


CREATE TYPE task_type AS ENUM ('break', 'work');
CREATE TABLE tasks
(
	id VARCHAR(36) PRIMARY KEY,
	account_id INT,
	schedule_id VARCHAR(36) REFERENCES schedules(id) ON DELETE CASCADE,
	start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC+10', CURRENT_TIMESTAMP),
	duration INT NOT NULL,
	type task_type NOT NULL
);