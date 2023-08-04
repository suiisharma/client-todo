import React, {  useContext, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Checkbox,
  IconButton,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from './spinner';
import { userContext } from '../App';

const ToDoCard = ({id, title, description, deadline, isCompleted,Loading,setLoading}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDeadline, setEditedDeadline] = useState(deadline);
   
   


  const handleTitleClick = () => {
    setShowDescription(!showDescription);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const {setPosts}=useContext(userContext)


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



   const UpdateTask=async(e)=>{
     setLoading(true)
     try {
      e.preventDefault()
      const res=await axios.put(`${process.env.REACT_APP_SERVER}/task/${id}`,{},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      await fetchAllPosts()
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setLoading(false)
   }

   const deleteTask=async(e)=>{
     try {
      setLoading(true)
      e.preventDefault();
      const res=await axios.delete(`${process.env.REACT_APP_SERVER}/task/${id}`,{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true
     })
     await fetchAllPosts()
     toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setLoading(false)
   }
  const handleSaveClick = async(e) => {
    setLoading(true)
     try {
      e.preventDefault();
       const res=await axios.post(`${process.env.REACT_APP_SERVER}/task/${id}`,{
        'title': editedTitle,
        'description':editedDescription,
        'Deadline':editedDeadline
       },{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true
     })
     await fetchAllPosts();
     setIsEditing(false)
     toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
   setLoading(false)
  };

  const handleCancelClick = () => {
    // Discard the changes and revert back to the original values
    setIsEditing(false);
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedDeadline(deadline);
  };

  return (
    <>
    {Loading  ? <Spinner></Spinner>:
    <Box borderWidth="1px" borderRadius="lg" p="4" shadow="md">
    <Flex align="center" justify="space-between">
    <Checkbox onChange={UpdateTask}  size="lg" defaultChecked={isCompleted} />
        {isEditing ? (
          <FormControl>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              size="lg"
            />
          </FormControl>
          ) : (
          <Heading as="h3" size="md" onClick={handleTitleClick} cursor="pointer">
            {title}
          </Heading>
        )}
        <Flex align="center">
        <IconButton
            icon={isEditing ? <></> : <EditIcon />}
            colorScheme="blue"
            aria-label="Edit"
            mr="2"
            onClick={handleEditClick}
          />
          <IconButton 
            icon={<DeleteIcon />}
            onClick={deleteTask}
            colorScheme="red"
            aria-label="Delete"
          />
          </Flex>
      </Flex>
      <Collapse in={showDescription} animateOpacity>
        <Text mt="2">{description}</Text>
        </Collapse>
        <Text mt="2" color="gray.500">Deadline: {deadline}</Text>
        <Modal isOpen={isEditing} onClose={handleCancelClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            />
            </FormControl>
            <FormControl mt="4">
            <FormLabel>Description</FormLabel>
            <Input
            value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              </FormControl>
            <FormControl mt="4">
              <FormLabel>Deadline</FormLabel>
              <Input
                value={editedDeadline}
                type='date'
                onChange={(e) => setEditedDeadline(e.target.value)}
                />
                </FormControl>
                </ModalBody>
                <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSaveClick}>
                Save
                </Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
                </Modal>
                </Box>
              }
              </>
  );
};

export default ToDoCard;
