/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect } from "react";
import "./Home.css";
import ToDoCard from "../utils/TodoCard";
import CatchyTagline from "../utils/CatchyTagline";
import AddTaskButton from "../utils/AddTaskBtn";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import WelcomeUserHeading from "../utils/WelcomeUserHeading";
import { userContext } from "../App";
import Spinner from "../utils/spinner";
import { useState } from "react";
import axios from "axios";

export const homeContext = createContext();

const compareByDeadline = (task1, task2) => {
  const deadline1 = new Date(task1.Deadline);
  const deadline2 = new Date(task2.Deadline);

  return deadline1 - deadline2;
};


const Home = () => {

  const { User, Posts,setPosts } = useContext(userContext);

  const [Loading, setLoading] = useState(false);


  useEffect(
    ()=>{
      const fetchAllPosts=async()=>{
        try {
          const res=await axios.get(`${process.env.REACT_APP_SERVER}/task/GetAllTasks`,{
            headers:{
              "Content-Type":"application/json"
            }
            ,
            withCredentials:true
          })
           let data=res.data.message;
            data.sort(compareByDeadline);          
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchAllPosts()
    }
  )
  

  return (
    <>
      {Loading ? (
        <Spinner></Spinner>
      ) : (
        <Flex direction={"column"} className="home">
          <Box>
            <WelcomeUserHeading user={User.name}></WelcomeUserHeading>
            <CatchyTagline></CatchyTagline>
          </Box>
          <Spacer></Spacer>
          <Box marginTop={["0vh","5vh"]}>
            {Posts && Posts[0] && (
              <ToDoCard
                key={Posts[0]._id}
                id={Posts[0]._id}
                title={Posts[0].title}
                description={Posts[0].description}
                deadline={Posts[0].Deadline}
                isCompleted={Posts[0].isCompleted}
                Loading={Loading}
                setLoading={setLoading}
              ></ToDoCard>
            )}
          </Box>
          <Box >
            <AddTaskButton></AddTaskButton>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Home;
