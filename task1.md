## Project 1: Team Task Tracker (mini Kanban)

Build a small board where a team creates tasks, assigns them to members and moves them across To Do, In Progress and Done.

**Problem.** Small teams track work in chats and spreadsheets, so nobody knows who owns what or what is blocked.

**Core features (must have)**

- Create, edit and delete a project board.
- Create tasks with title, description, priority (Low, Medium, High) and due date.
- Assign a task to one team member.
- Change task status: To Do, In Progress, Done.
- Board view with three columns, plus filter by assignee and priority.
- Add comments on a task.

**Data model (Prisma)**

| Model | Key fields | Relations |
| --- | --- | --- |
| User | id, name, email (unique) | has many Tasks (assignee), Comments |
| Board | id, name, createdAt | has many Tasks |
| Task | id, title, description, status (enum), priority (enum), dueDate, boardId, assigneeId | belongs to Board, optional User |
| Comment | id, body, createdAt, taskId, authorId | belongs to Task and User |

**API endpoints (Node.js)**

| Method | Route | Purpose |
| --- | --- | --- |
| GET / POST | /api/boards | List or create boards |
| GET / PATCH / DELETE | /api/boards/:id | Board with its tasks; rename; delete |
| POST | /api/boards/:id/tasks | Create a task |
| PATCH / DELETE | /api/tasks/:id | Update fields or status; delete |
| GET / POST | /api/tasks/:id/comments | List or add comments |
| GET | /api/users | Members for the assignee dropdown |

**Pages (Next.js)**

- `/` lists boards with a "New board" form.
- `/boards/[id]` shows the three-column board with filters.
- Task detail opens in a modal or `/tasks/[id]` with edit form and comments.


**Acceptance criteria**

- [ ] A new task appears in To Do and survives a page refresh.
- [ ] Changing status moves the card to the right column.
- [ ] Filtering by assignee shows only that person's tasks.
- [ ] Deleting a board also deletes its tasks (cascade in Prisma).
- [ ] Overdue tasks are highlighted.

**Stretch goals:** drag and drop with dnd-kit, activity log per task, simple login with NextAuth.





