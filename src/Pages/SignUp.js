import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../utils/spinner";

const isPasswordStrong = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};

const SignupPage = () => {
  const { colorMode } = useColorMode();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ReEnter, setReEnter] = useState("");
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const user=useContext(userContext);
  
  const signupHandler = async(e) => {
    setLoading(true)
   try {
     e.preventDefault();
     if (!isPasswordStrong(Password)) {
      toast.custom(
        (t) => (
          <div
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '1rem',
              borderRadius: '5px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onClick={() => toast.dismiss(t.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-alert-circle"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
            </svg>
            Please use a stronger password. It should contain at least one uppercase letter, one lowercase letter, one number, and have a minimum length of 8 characters.
          </div>
        ),
        {
          duration: 5000,
        }
      );
      setLoading(false);
      return ;
     }
      if(Password!==ReEnter){
       toast.error('Password Fields Not Matching!')
       setLoading(false)
       return ;
      }
      if(!Name || !Email || !Password){
        toast.error('Fields Can\'t Be Empty!')
        setLoading(false)
        return ;
      }
     await axios.post(`${process.env.REACT_APP_SERVER}/user/signUp`,{"name":Name,"email":Email,"password":Password},{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true
     })
     toast.custom((t) => (
      <div
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '1rem',
          borderRadius: '5px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        onClick={() => toast.dismiss(t.id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12" y2="16"></line>
        </svg>
        Complete your registration by clicking the link in your inbox.
      </div>
    ), {
      duration: 5000, 
    });
     navigate('/login')
   } catch (error) {
     toast.error(error.response.data.message)
   }
   setLoading(false)
  };
  return (
    <>
    {
      user.User && <Navigate to={'/'}></Navigate>
    }
    {
      Loading ? (<Spinner></Spinner> ):
      <Flex minH="100vh" align="center" justify="center">
      <Box
      maxW="md"
      p={8}
      rounded="lg"
      bg={colorMode === "light" ? "white" : "gray.700"}
      boxShadow="dark-lg"
      w="90%"
      mx="auto"
      textAlign="center"
      >
      <Heading
      as="h1"
      size="xl"
      mb={6}
      color={colorMode === "light" ? "teal.500" : "teal.300"}
      >
      SignUp
      </Heading>
      <FormControl id="name" mb={4}>
      <FormLabel>Name</FormLabel>
      <Input
      onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter your name"
            />
            </FormControl>
            <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter your email"
            />
            </FormControl>
            <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your password"
            />
            </FormControl>
            <FormControl id="reenterPassword" mb={4}>
            <FormLabel>Re-enter Password</FormLabel>
            <Input
            onChange={(e) => {
              setReEnter(e.target.value);
            }}
            type="password"
            placeholder="Re-enter your password"
            />
            </FormControl>
            <Button
            onClick={signupHandler}
            colorScheme={colorMode === "light" ? "teal" : "blue"}
            mb={4}
            width="100%"
            _hover={{ bg: colorMode === "light" ? "teal.500" : "blue.500" }}
            >
            SignUp
            </Button>
            <Divider my={2} />
            <Link to="/login">
            <Button
            colorScheme={colorMode === "light" ? "blue" : "teal"}
            my={4}
            variant="outline"
            width="100%"
            _hover={{ bg: colorMode === "light" ? "blue.500" : "teal.500" }}
            >
            Login
            </Button>
            </Link>
            </Box>
            </Flex>
          }
          </>
          );
};

export default SignupPage;
