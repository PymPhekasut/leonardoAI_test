# Leonardo.AI - Software Engineering Challenge 

First of all, I really appreciate that you invited me to this stage and I'm very enjoy the challenge!

### Setting configuration
In this repo, I'm using TypeScript as required to build APIs via AWS Lambda for Serverless endpoints. Also, using Jest for unit-tests and integration tests.

For the database, I'm using a docker for running local database with PostgreSQL as preferred and pgAdmin4 on browser.


### Installation/deployment instructions

- Install packages
```
>  npm install 
```
- Run a docker via `docker-compose.yml`, to connect database locally. 
```
>  docker-compose up 
```
- Start serverless offline, running on port 3000 and all api endpoints will be appeared on your terminal
 ```
>  serverless offline start
```
- Unit tests and integration tests
```
>  npm run test 
```

### Directories
```
src
├── collections                 # Lambda Serverless configuration like configs, routes, and logic
├── functions                   # Lambda configuration and source code folder
│   ├── schedules
│   └── tasks
├── interface                   # Handles interfaces for request and response objects
├── libs                        # Handles response like utils
├── model                       # Handles interactions with the database, also sql scripts
└── schemas                     # Lambda input event JSON-Schema
```

### Limitations
- The challenge instruction is clear enough to implement API endpoints (CRUD) with required tools/tech  stacks but the logic for managing schedules and tasks may not clear enough for me, but not a problem 😋. 
- As it a one-to-many relationship, I handled in sql scripts as references in table. Hopefully I can implement it better for logic and response if have more time. 
  
  For example, to find all tasks from `schedule_id` but this repo I've done only APIs for its own api collections as you mentioned it's just a small scope, I apologize 🙏🏻.

- Setup Serverless project is a little bit tricky as many configs are fixed upon platforms (arm64 or more). I spent time a bit to set it up, hope you don't mind. 


Thank you again for inviting me to try this chanllenge! 👾