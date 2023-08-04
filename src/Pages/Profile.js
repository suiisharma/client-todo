import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Avatar,
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
  IconButton,
  Center,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { userContext } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";
import LogoutButton from "../Components/Logout";
import Spinner from "../utils/spinner";



const generateDefaultProfilePic = (name) => {
  // Generate a random background color
  const colors = [
    "#ff7675",
    "#74b9ff",
    "#55efc4",
    "#ffeaa7",
    "#a29bfe",
    "#fd79a8",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Avatar
      size="2xl"
      name={name}
      src={null} // No source URL for the default profile picture
      bg={randomColor}
      color="white"
    ></Avatar>
  );
};

const ProfilePage = () => {
  const uSER= useContext(userContext);
  const [Loading, setLoading] = useState(false)

  const [isEditModalOpen, setEditModalOpen] = useState(false);
 
  const [image, setImage] = useState(null);
  const [Reload, setReload] = useState(false)

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleRemoveProfile=async()=>{
    setLoading(true)
  try {
      const res=await axios.delete(`${process.env.REACT_APP_SERVER}/profile/RemoveProfilePic`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      uSER.setImageUrl(null)
      setImage(null)
      handleEditModalClose();
      toast.success(res.data.message)
      
  } catch (error) {
    toast.error(error.response.data.message)
  }
  setLoading(false)
  }
  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/profile/UploadProfile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        setImage(null)
       uSER.setImageUrl(`${process.env.REACT_APP_SERVER1}/${res.data.message}`)
       handleEditModalClose();
        toast.success('Profile Pic Updated Successful!')
        setLoading(false)
      }
      else{
        toast.error('Profile Update failed, Try later!')
        setLoading(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
    setReload((r)=>!r)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setImage(file);
      }
    }
  };

  useEffect(
    () => {
      setLoading(true)
      try {
        const getProfile = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/profile/GetProfile`, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            if (!res.data.UseGooglePic) {
              setLoading(false)
              uSER.setImageUrl(`${process.env.REACT_APP_SERVER1}/${res.data.message.ProfilePic}`);
              toast.success("Profile pic fetched successful!");
              setLoading(false)
              return ;
            } else {
              toast.success("Profile pic fetched successful!");
              setLoading(false)
              return;
            }
          } catch (error) {
            setLoading(false)
            toast.error("Profile Picture Failed To Fetch!");
          }
        };
        getProfile();
      } catch (error) {
        setLoading(false)
        toast.error("Some Error Occured!");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Reload]
  );

  return (
    <>
    {Loading ? <Spinner></Spinner> :
    <Center minHeight="100vh">
    <Box p={4} textAlign="center">
    {uSER.ImageUrl  ? (
      
          <Avatar
            key={uSER.ImageUrl}
            size="2xl"
            name={uSER.User.name}
            src={uSER.ImageUrl}
            />
            ) : (
         generateDefaultProfilePic(uSER.User.name)
        )}
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          {uSER.User.name}
        </Text>
        <Text>{uSER.User.email}</Text>
        <IconButton
        icon={<EditIcon />}
        variant="ghost"
        colorScheme="teal"
        onClick={handleEditModalOpen}
        />
        <LogoutButton></LogoutButton>
        <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
        <FormControl id="profilePicture" mb={4}>
        <FormLabel>Profile Picture</FormLabel>
        <Input
        type="file"
        accept=".jpg, .png"
        onChange={handleImageChange}
        />
        {image && (
          <Box mt={4}>
          <Avatar
          size="2xl"
          name={uSER.User.name}
                      src={URL.createObjectURL(image)}
                      />
                      </Box>
                )}
              </FormControl>
              </ModalBody>
              <ModalFooter>
              <Button colorScheme="teal" mr={5} onClick={handleRemoveProfile}>
              Remove Profile Pic
              </Button>
              <Button colorScheme="teal" mr={3} onClick={handleUpdateProfile}>
              Update
              </Button>
              <Button variant="ghost" onClick={handleEditModalClose}>
              Cancel
              </Button>
              </ModalFooter>
              </ModalContent>
              </Modal>
              </Box>
              </Center>
        }
              </>
              );
};

export default ProfilePage;
