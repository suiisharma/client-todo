import React, { createContext, useContext } from "react";
import ToDoCard from "../utils/TodoCard";
import { Flex } from "@chakra-ui/react";
import AddTaskBtn from "../Components/AddTaskBtn";
import { userContext } from "../App";
import AnimatedText from "../Components/FirstTask";
import Spinner from "../utils/spinner";
import { useState } from "react";

export const todoContext = createContext();

const Todos = () => {
  const { Posts } = useContext(userContext);
  const [Loading, setLoading] = useState(false);


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
