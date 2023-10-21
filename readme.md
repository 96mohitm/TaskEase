# TaskEase


Instructions on how to setup the project.
1. ` python3 -m venv taskease_env `
2. ` source taskease_env/bin/activate `
3. Start django app. (might have to migrations.)
4. Start npm server.


Assumptions:
1. We will have user login/register
2. User will be able to see only the task which they have created.
3. The User avatars were stored in the server itself, 
   but in production it should be stored in blob storage service like S3.

Task:
1. title
2. description
3. status (e.g., "To Do," "In Progress," "Done")

Database:

Backend APIs:
1. create_task
2. get_task
3. update_task
4. delete_task
5. list_task (with a filter by status)

Non-functional Requirements:
1. server-side validation - Tasks must have a title and a valid status.
2. Error Handling: Properly handle errors, including sending appropriate error messages and status codes in response.
3. Unit tests for critical parts like API endpoints and data validations, etc.

Frontend:
1. Form to create a new Task
2. List of task with ability of update and delete.
3. In the list add filter.

Other imp features on Frontend:
1. form validation (tasks cannot be created without a title, etc)
2. mobile responsive.
3. Unit tests for critical parts like data validations, etc.

### Security:
#### Implement basic security measures to protect the application from common vulnerabilities.
1. Rate limit for backend
2. some security related stuff on the frontend.
   1. auth token are saved on header (http-only) not on localstorage.
3. 

Bonus:
1. User authentication and authorization to restrict access to tasks.
2. Task due dates and reminders.
3. Task sorting and searching capabilities.
4. User profiles with avatars.
