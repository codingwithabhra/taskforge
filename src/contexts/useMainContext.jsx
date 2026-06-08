import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import * as bootstrap from "bootstrap";

const MainContext = createContext();
export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // PROJECT RELATED STATES
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  // TASK RELATED STATES
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  // TEAM RELATED STATES
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersToRemove, setSelectedMembersToRemove] = useState([]);

  //Storing logged in user's info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  //Finding team by ID
  const findTeamById = (id) => {
    return teamData?.find((team) => team._id === id);
  };
  console.log("This is from context, users --", allUsers);

  //Finding project by ID
  const findProjectById = (id) => {
    return projects?.find((project) => project._id === id);
  };
  console.log("This is from context, users --", allUsers);

  // To color the team members' name initials
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length === 1 ? words[0][0] : words[0][0] + words[1][0];
  };

  const colors = ["#FF4500", "#C21E56", "#16a34a", "#f59e0b"];

  const getColor = (index) => colors[index % colors.length];

  // Fetching users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(
        "https://taskforge-backend.vercel.app/auth/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAllUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching teams on component mount
  const fetchTeamData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        "https://taskforge-backend.vercel.app/teams",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTeamData(response.data);
      console.log("This is from context --", response);
    } catch (error) {
      console.log("Error fetching teams -- ", error);
    }
  };

  // Fetching projects on component mount
  const fetchProjectData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        "https://taskforge-backend.vercel.app/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetching task data on component mount
  const fetchTasksData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "https://taskforge-backend.vercel.app/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks: ", error);
    }
  };

  // one main useeffect
  useEffect(() => {
    if (!currentUser) return;

    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchUsers(),
        fetchTeamData(),
        fetchProjectData(),
        fetchTasksData(),
      ]);

      setLoading(false);
    };

    loadData();
  }, [currentUser]);

  // Fetching tasks based on taskid
  const findTaskById = (id) => {
    return tasks?.find((task) => task._id === id);
  };

  // To create new project
  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      //Project API call
      const response = await axios.post(
        "https://taskforge-backend.vercel.app/projects",
        {
          name: projectName,
          description: projectDescription,
          deadline: projectDeadline,
          status: projectStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);

      // Reset form
      setProjectName("");
      setProjectDescription("");
      setProjectDeadline("");
      setProjectStatus("");

      console.log("API Response:", response.data);
      // update ui
      // setProjects([...projects, response.data]);
      await fetchProjectData();

      // Success Notification
      toast.success("Project created successfully");

      document
        .querySelector('#createProjectModal [data-bs-dismiss="modal"]')
        ?.click();
    } catch (error) {
      console.log(error.response?.data || error.message);
      // Error Notification
      toast.error("Error creating project");
    }
  };

  // Updating task status
  const updateTaskStatus = async (taskId, updatedStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://taskforge-backend.vercel.app/tasks/${taskId}`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchTasksData();

      // Success Notification
      toast.success("Task status updated successfully");

      return response.data;
    } catch (error) {
      console.log("Error updating task status", error);
      // Error Notification
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Error creating project";

      toast.error(errorMessage);
    }
  };

  // Deleting a project
  const deleteProject = async (projectId, projectName) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://taskforge-backend.vercel.app/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchProjectData();

      toast.success(`Project ${projectName} deleted successfully`);

      return response.data;
    } catch (error) {
      console.log("Error deleting project:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to delete project";

      toast.error(errorMessage);
    }
  };

  // Deleting a task
  const deleteTask = async (taskId, taskName) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://taskforge-backend.vercel.app/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update UI after delete
      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      await fetchTasksData();

      toast.success(`Task "${taskName}" deleted successfully`);

      return response.data;
    } catch (error) {
      console.log("Error deleting task:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to delete task";

      toast.error(errorMessage);

    }
  };

  //adding a team member
  const handleAddMembers = async (teamId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://taskforge-backend.vercel.app/teams/${teamId}/add-member`,
        {
          memberIds: selectedMembers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSelectedMembers([]);

      await fetchTeamData();

      toast.success("Member(s) added successfully");

      document
        .querySelector('#addMemberModal [data-bs-dismiss="modal"]')
        ?.click();
    } catch (error) {
      console.log("Error adding member:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to add member";

      toast.error(errorMessage);
    }
  };

  //removing a team member
  const handleRemoveMembers = async (teamId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://taskforge-backend.vercel.app/teams/${teamId}/remove-member`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            memberIds: selectedMembersToRemove,
          },
        },
      );

      setSelectedMembersToRemove([]);

      await fetchTeamData();

      toast.success("Member(s) removed successfully");

      document
        .querySelector('#removeMemberModal [data-bs-dismiss="modal"]')
        ?.click();
    } catch (error) {
      console.log("Error adding member:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to remove member";

      toast.error(errorMessage);

    }
  };

  // DELETE TEAM
  const handleDeleteTeam = async (teamId, teamName) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://taskforge-backend.vercel.app/teams/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchTeamData();

      toast.success(`"Team ${teamName}" deleted successfully`);
    } catch (error) {
      console.log(error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to delete team";

      toast.error(errorMessage);
    }
  };

  return (
    <MainContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        teamData,
        setTeamData,
        findTeamById,
        allUsers,
        setAllUsers,
        loading,
        setLoading,
        projects,
        setProjects,
        handleCreateProject,
        projectName,
        setProjectName,
        projectDescription,
        setProjectDescription,
        projectDeadline,
        setProjectDeadline,
        projectStatus,
        setProjectStatus,
        findProjectById,
        deleteProject,
        tasks,
        setTasks,
        taskName,
        setTaskName,
        taskDeadline,
        setTaskDeadline,
        taskStatus,
        setTaskStatus,
        taskPriority,
        setTaskPriority,
        taskTags,
        setTaskTags,
        getInitials,
        getColor,
        selectedOwners,
        setSelectedOwners,
        fetchTasksData,
        findTaskById,
        updateTaskStatus,
        deleteTask,
        fetchProjectData,
        fetchTasksData,
        fetchTeamData,
        selectedMembers,
        setSelectedMembers,
        selectedMembersToRemove,
        setSelectedMembersToRemove,
        handleAddMembers,
        handleRemoveMembers,
        handleDeleteTeam,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default useMainContext;
