import React, { createContext, useContext } from "react";
import ToDoCard from "../utils/TodoCard";
import { Flex } from "@chakra-ui/react";
import AddTaskBtn from "../Components/AddTaskBtn";
import { userContext } from "../App";
import AnimatedText from "../Components/FirstTask";
import Spinner from "../utils/spinner";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const todoContext = createContext();


const compareByDeadline = (task1, task2) => {
  const deadline1 = new Date(task1.Deadline);
  const deadline2 = new Date(task2.Deadline);

  return deadline1 - deadline2;
};


const Todos = () => {
  const { Posts ,setPosts} = useContext(userContext);
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
        <Flex direction={"column"}>
          {Posts !== null && Posts[0] ? (
            Posts.map((i, index) => {
              return (
                <ToDoCard
                  key={i._id}
                  id={i._id}
                  title={i.title}
                  description={i.description}
                  deadline={i.Deadline}
                  isCompleted={i.isCompleted}
                  Loading={Loading}
                  setLoading={setLoading}
                ></ToDoCard>
              );
            })
          ) : (
            <AnimatedText></AnimatedText>
          )}
          <todoContext.Provider value={{ Loading, setLoading }}>
            <AddTaskBtn></AddTaskBtn>
          </todoContext.Provider>
        </Flex>
      )}
    </>
  );
};

export default Todos;
