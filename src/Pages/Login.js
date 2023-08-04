import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorMode,
  Divider,
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../utils/spinner";


const LoginPage = () => {
  const { colorMode } = useColorMode();
  const navigate=useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const user = useContext(userContext);

  const [Loading, setLoading] = useState(false);

  const LoginHandler = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/login`,
        { email: Email, password: Password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      user.setUser(res.data.User);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      if(error?.response?.data?.message === "Please SignUp!"){
        navigate('/signUp')
      }
    }
    setLoading(false);
  };

  return (
    <>
    {user.User && <Navigate to={"/"}></Navigate>}
      {Loading ? (
        <Spinner></Spinner>
      ) : (
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
              Login
            </Heading>
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
            <Button
              colorScheme={colorMode === "light" ? "teal" : "blue"}
              mb={4}
              width="100%"
              _hover={{ bg: colorMode === "light" ? "teal.500" : "blue.500" }}
              onClick={LoginHandler}
            >
              Login
            </Button>
            <Divider my={2} />
            <Link to="/signup">
              <Button
                colorScheme={colorMode === "light" ? "blue" : "teal"}
                mb={4}
                variant="outline"
                width="100%"
                _hover={{ bg: colorMode === "light" ? "blue.500" : "teal.500" }}
              >
                SignUp
              </Button>
            </Link>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default LoginPage;
