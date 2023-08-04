import React, { useContext, useState } from "react";
import { Button, Center } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../App";


const LogoutButton = () => {
  const navigate=useNavigate();
  const [LoggedOut, setLoggedOut] = useState(false)
  const {setUser}=useContext(userContext)
   
  const handleLogout =async(e) => {
   try {
     e.preventDefault()

    const res=await axios.get(`${process.env.REACT_APP_SERVER}/user/logout`,{
     headers:{
         "Content-Type":"application/json"
     },
     withCredentials:true
    })
    setUser(null)
    setLoggedOut(true)

    toast.success(res.data.message)
    navigate('/login')
   } catch (error) {
    toast.error(error.response.data.message)
   }
  };

  return (
    <>
    <Center>
    {LoggedOut && <Navigate to='/'></Navigate>}
    <Button bg={'red.500'} _hover={{bg:'red.200'}} onClick={handleLogout}>
    Logout
    </Button>
    </Center>
  </>
  );
};

export default LogoutButton;
