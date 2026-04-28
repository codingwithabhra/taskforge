import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MainContext = createContext();
export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = ({ children }) => {
  const [teamData, setTeamData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const { teamId } = useParams();

  const findTeamById = (id) => {
    return teamData?.find((team) => team._id === id);
  };
  console.log("This is from context, users --", allUsers);

  // Fetching users
  useEffect(() => {
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
    fetchUsers();
  }, [setAllUsers]);

  // Fetching teams on component mount
  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, [setTeamData]);

  // Fetching projects on component mount
  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [setProjects]);

  return (
    <MainContext.Provider
      value={{
        teamData,
        setTeamData,
        findTeamById,
        allUsers,
        setAllUsers,
        loading,
        setLoading,
        projects,
        setProjects,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default useMainContext;
