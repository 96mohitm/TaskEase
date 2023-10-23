# TaskEase

## Table of Contents
- [TaskEase](#taskease)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
    - [Backend:](#backend)
    - [Frontend](#frontend)
  - [Getting Started](#getting-started)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Assumptions:](#assumptions)
  - [API Endpoints](#api-endpoints)
  - [Database Design](#database-design)
    - [Task Table](#task-table)
  - [Security:](#security)
  - [Bonus:](#bonus)


## Tech Stack
### Backend:

- Django Rest Framework (DRF)
- SQLite

### Frontend
- React
- TailwindCSS
## Getting Started

### Backend 
Note: I am using `Python 3.11.4`
1. Navigate to the `backend` directory.
2. Setup a virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```
   python manage.py migrate
   ```
5. Start the server:
   ```
   python manage.py runserver
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install the required packages:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Assumptions:
1. We will have user login/register
2. User will be able to see only the task which they have created.
3. The User avatars were stored in the server itself, 
   but in production it should be stored in blob storage service like S3.


## API Endpoints

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/api/tasks/`          | Retrieve all tasks                |
| POST   | `/api/tasks/`          | Create a new task                 |
| GET    | `/api/tasks/:task_id/` | Retrieve details of a specific task|
| PUT    | `/api/tasks/:task_id/` | Update a specific task            |
| DELETE | `/api/tasks/:task_id/` | Delete a specific task            |


## Database Design

### Task Table

| Column Name  | Data Type          | Description                                                 | Constraints                               |
|--------------|--------------------|-------------------------------------------------------------|-------------------------------------------|
| id           | Integer (Auto)     | Unique identifier for each task                             | Primary Key, Auto-Increment               |
| title        | CharField          | Title of the task                                           | Max Length: 200, Not Null                 |
| description  | TextField          | Detailed description of the task (optional)                 | Nullable                                  |
| status       | CharField          | Current status of the task                                  | Choices: 'TO_DO', 'IN_PROGRESS', etc., Default: 'TO_DO' |
| due_date     | DateField          | Due date of the task (optional)                             | Nullable                                  |
| created_at   | DateTimeField      | Timestamp when the task was created                         | Auto-generated, Not Null                  |
| updated_at   | DateTimeField      | Timestamp when the task was last updated                    | Auto-updated, Not Null                    |
| created_by   | ForeignKey (User)  | User who created the task                                   | Not Null, Foreign Key to User             |
| modified_by  | ForeignKey (User)  | User who last modified the task                             | Nullable, Foreign Key to User             |

The `User` table, which originates from Django's built-in authentication system, is utilized to link tasks to users. Each task is created by a user, and the task may also be modified by a user.


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

## Security:
Implement basic security measures to protect the application from common vulnerabilities.
1. Rate limit for backend
2. some security related stuff on the frontend.
   1. auth token are saved on header (http-only) not on localstorage.


## Bonus:
1. User authentication and authorization to restrict access to tasks.
2. Task due dates and reminders.
3. Task sorting and searching capabilities.
4. User profiles with avatars.
