import React, { useContext } from "react";
import {
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { userContext } from "../App";
import { Navigate } from "react-router-dom";

const AddTaskBtn = () => {
    const {Redirect,setRedirect}=useContext(userContext)
  const OnClickHandler = async () => {
     setRedirect(true);
  };
  return (
    <>
    {Redirect && <Navigate to='/todo'></Navigate>}
          <Button
            position="fixed"
            bottom={["10vh", "6vh", "2vh"]}
            right={4}
            size="lg"
            width={"70px"}
            height={"70px"}
            colorScheme="red"
            borderRadius="100%"
            boxShadow="md"
            onClick={OnClickHandler}
          >
            <AddIcon></AddIcon>
          </Button>
        </>
  );
};

export default AddTaskBtn;
