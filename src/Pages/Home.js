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

export const homeContext = createContext();



const Home = () => {

  const { User, Posts} = useContext(userContext);

  const [Loading, setLoading] = useState(false);



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
