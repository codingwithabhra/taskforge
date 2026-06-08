# TaskForge App
TaskForge is a full-stack task management and team collaboration platform built with React, Node.js, Express, MongoDB, and Bootstrap.

It enables users to create projects, assign tasks, manage deadlines, and organize work with tags, while providing secure authentication, dynamic filtering, URL-based queries, and reporting features to monitor project progress and team productivity through a responsive user interface.

---

## Demo Link
[Demo Link](https://taskforge-xi.vercel.app/)

---

## Log In

> **Guest**
> Username: 'Amit Sharma',
> Email: 'amit.sharma01@example.com',
> Password: 'Password@123'

---

## Quick Start
```
git clone https://github.com/codingwithabhra/taskforge
cd <your-repo>
npm install
npm run dev # or `npm start` / `yarn dev`
```

---

## Technologies
- React Js
- React Router
- Auth Middleware
- Pie Chart
- Bar Chart
- Node Js
- Express Js
- Mongodb
- Bootstrap

---

## Demo Video
Watch a walkthrough (5-7 minutes) of all the major features of this app : [Watch Video](https://drive.google.com/drive/folders/1ZrhokGWuC42BygXehgLd11TqjR_KC2FL?usp=sharing)

---

## Features
**Authentication**
- User sign up and log in with JWT.

**Dashboard**
- Display Projects, Tasks and Quick Filters with a navigation bar and Search Task option.
- Also option for 'Create Project' or 'Create Task'.

**Projects**
- View list of projects with 'Create Project' option.

**Projects Details**
- Detailed project information like -- Task Name, Owners, Due Date, Status, Priority.
- Sort By Priority, Filter By Status, Clear filter button and create task option.

**Task Details**
- Detailed task information like -- Project Name, Team, Due Date, Tags, Priority, Owners, Remaining days, Mark as complete button.
- Filters & Sort By buttons.

**Team**
- List of all the teams with 'view team' button, members count and short form of their names.

**Team Details**
- Team name, team members' name, team members count and date of team creation.

**Reports**
- Pie Chart for Tasks closed by teams.
- Bar Chart for Total workdone last week.
- Bar Chart for Total days of work pending.
- Bar Chart for Tasks closed by owners. 

**Settings**
- User's complete information with a 'Log Out' button.
- Complete project and task list with delete option.

---

## Api Reference

### **POST /api/auth/signup**<br>
To send new user info to database<br>
Sample response:<br>
```
[{_id, name, email, password},...]
```

### **GET /api/auth/users**<br>
To get complete list of user info from database<br>
Sample response:<br>
```
[{_id, name, email, password},...]
```

### **POST /api/auth/login**<br>
To verify existing user info from database<br>
Sample response:<br>
```
[{_id, name, email, password, token},...]
```

### **POST /api/projects**<br>
To send new project info into database<br>
Sample response:<br>
```
[{_id, name, description, deadline, status},...]
```

### **GET /api/projects**<br>
Get complete project list from database<br>
Sample response:<br>
```
[{_id, name, description, deadline, status},...]
```

### **DELETE /api/projects/:projectId**<br>
To delete particular project from database<br>
Sample response:<br>
```
[{_id, name, description, deadline, status},...]
```

### **POST /api/tags**<br>
To send new tags into database<br>
Sample response:<br>
```
[{_id, name},...]
```

### **POST /api/tasks**<br>
To send new task info into database<br>
Sample response:<br>
```
[{_id, name, project, team, owners, tags, timeToComplete, status, priority},...]
```

### **GET /api/tasks**<br>
To get all tasks from database<br>
Sample response:<br>
```
[{_id, name, project, team, owners, tags, timeToComplete, status, priority},...]
```

### **POST /api/tasks/:taskId**<br>
To update particular task into database<br>
Sample response:<br>
```
[{_id, name, project, team, owners, tags, timeToComplete, status, priority},...]
```

### **DELETE /api/tasks/:taskId**<br>
To delete particular task from database<br>
Sample response:<br>
```
[{_id, name, project, team, owners, tags, timeToComplete, status, priority},...]
```

### **POST /api/teams**<br>
To send new team info into database<br>
Sample response:<br>
```
[{_id, name, members},...]
```

### **GET /api/teams**<br>
To get all team info from database<br>
Sample response:<br>
```
[{_id, name, members},...]
```

---

## Contacts
For bugs or features request please reach out to patra.abhra97@gmail.com
