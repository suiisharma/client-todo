import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { Tilt } from "react-tilt";

const ThreeDCard = () => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "gray.600" : "gray.200";

  const isMobile = window.innerWidth <= 768; 

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
          gyroscope: false, 
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
          _hover={!isMobile && { transform: "rotateY(10deg)" }} // Apply hover effect only on non-mobile devices

          // Apply a subtle scale animation for mobile devices
          transform={isMobile ? "scale(1.02)" : "none"}
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
