# REST service with using TypeScript

After cloning use command

`git checkout task-9`

**The application operates with the following resources:**

- `User` (with attributes):
  ```javascript
  { id, name, login, password }
  ```
- `Board` (set of `columns`):
  ```javascript
  { id, title, columns }
  ```
- `Column` (set of tasks):
  ```javascript
   { id, title, order }
  ```
- `Task`:
  ```javascript
  {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  }
  ```

**Details:**

1. For `User`, `Board` and `Task` REST endpoints with separate router paths should be created
    * `User` (`/users` route)
      * `GET /users` - get all users (remove password from response)
      * `GET /users/:userId` - get the user by id (ex. “/users/123”) (remove password from response)
      * `POST /users` - create user
      * `PUT /users/:userId` - update user
      * `DELETE /users/:userId` - delete user
    * `Board` (`/boards` route)
      * `GET /boards` - get all boards
      * `GET /boards/:boardId` - get the board by id
      * `POST /boards` - create board
      * `PUT /boards/:boardId` - update board
      * `DELETE /boards/:boardId` - delete board
    * `Task` (`boards/:boardId/tasks` route)
      * `GET boards/:boardId/tasks` - get all tasks
      * `GET boards/:boardId/tasks/:taskId` - get the task by id
      * `POST boards/:boardId/tasks` - create task
      * `PUT boards/:boardId/tasks/:taskId` - update task
      * `DELETE boards/:boardId/tasks/:taskId` - delete task

2. To init the service `npm i` command should be used.

3. To run the service `npm start` command should be used.

4. To run the linter `npm run lint` command should be used.

5. To run the tests `npm run test` command should be used.

4. Service listens on PORT `4000`.

**Work with Docker:**

1. Build a container `docker-compose build`.

2. Run a container `docker-compose up -d` in detached mode.

3. Run tests `docker exec -i -t {id} sh` on launched container.

4. To see all containers `docker ps -a` (f.e. to get ID of contained).

5. To see all images `docker images`.

6. To build image `docker build .`.

7. To stop container `docker-compose stop`.

8. To show logs `docker-compose logs`.


