import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { Tilt } from "react-tilt";

const ThreeDCard = () => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "gray.600" : "gray.200";

  const isMobile = window.innerWidth <= 768; // Define your breakpoint for mobile screens

  if (isMobile) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        background="linear-gradient(135deg, #3498db, #8e44ad)"
      >
        <Text
          fontSize={{ base: "24px", md: "36px", lg: "48px" }}
          fontWeight="bold"
          color="white"
          textAlign="center"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          transformstyle="preserve-3d"
          transition="transform 0.3s ease"
        >
          Create Your First Task!
        </Text>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Tilt
        options={{
          scale: 1.1,
          max: 25,
          gyroscope: false, // Disable gyroscope on mobile for a consistent experience
        }}
      >
        <Box
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="dark-lg"
          textAlign="center"
          position="relative"
          transformstyle="preserve-3d"
          transition="transform 0.3s ease"
          borderTop={`1px solid ${borderColor}`}
          bgColor={colorMode === "light" ? "white" : "gray.700"}
          _hover={{ transform: "rotateY(10deg)" }} // Apply hover effect only on non-mobile devices
        >
          <Text
            fontSize={{ base: "24px", md: "36px", lg: "48px" }}
            fontWeight="bold"
            color="teal.500"
            animation="bounce 1s infinite"
            mb={4}
          >
            Create Your First Task!
          </Text>

          {/* Shadow to create 3D effect */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="gray.400"
            opacity={0.2}
            borderRadius="md"
            pointerEvents="none"
            zIndex="-1"
            transform="translateZ(-1px)"
          />
        </Box>
      </Tilt>
    </Box>
  );
};

export default ThreeDCard;
