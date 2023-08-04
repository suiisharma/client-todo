import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import {  toast } from "react-hot-toast";
import { userContext } from "../App";
import Spinner from "../utils/spinner";
import { todoContext } from "../Pages/Todos";

const AddTaskBtn = () => {

   const {setPosts,Redirect,setRedirect}=useContext(userContext)
   
   const {Loading, setLoading} = useContext(todoContext)


  const [isOpen, setIsOpen] = useState(Redirect);

  const [Title, setTitle] = useState(null)
  const [Desc, setDesc] = useState(null)
  const [Deadline, setDeadline] = useState(null)

  const onClose = () =>{ setIsOpen(false);
       setRedirect(false);
  }
   const compareByDeadline = (task1, task2) => {
    const deadline1 = new Date(task1.Deadline);
    const deadline2 = new Date(task2.Deadline);
  
    return deadline1 - deadline2;
  };
  
  const fetchAllPosts=async()=>{
    setLoading(true)
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
    setLoading(false)
  }
   const OnClickHandler=async()=>{
     setRedirect(false)
    setLoading(true)
   try {
     const res=await axios.post(`${process.env.REACT_APP_SERVER}/task/CreateTask`,{'title':Title,'description':Desc,'Deadline':Deadline},{headers:{
       "Content-Type":"application/json"
     },withCredentials:true})
     toast.success(res.data.message)
     onClose()
     fetchAllPosts()
   } catch (error) {
    toast.error(error.response.data.message)
   }
   setLoading(false)
   }
  return (
    <>
    {Loading ? <Spinner></Spinner> :
    <>
    <Button
    position="fixed"
    bottom={['10vh','6vh','2vh']}
    right={4}
    size="lg"
    width={'70px'}
    height={'70px'}
    colorScheme="red"
    borderRadius="100%"
    boxShadow="md"
    onClick={() => setIsOpen(true)}
    >
    <AddIcon></AddIcon>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>Add Task</ModalHeader>
      <ModalBody>
      <FormControl id="title" mb={4}>
      <FormLabel>Title</FormLabel>
      <Input onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder="Enter task title" />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel >Description</FormLabel>
              <Textarea onChange={(e)=>{setDesc(e.target.value)}} placeholder="Enter task description" />
            </FormControl>
            <FormControl id="deadline" mb={4}>
            <FormLabel>Deadline</FormLabel>
            <Input onChange={(e)=>{setDeadline(e.target.value)}} type="date" />
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={OnClickHandler}>
              Create
              </Button>
              <Button variant="ghost" onClick={onClose}>
              Cancel
              </Button>
          </ModalFooter>
          </ModalContent>
          </Modal>
          </>
        }
        </>
  );
};

export default AddTaskBtn;
