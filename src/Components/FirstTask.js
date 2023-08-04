import React, { useState } from "react";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { Tilt } from "react-tilt";

const ThreeDCard = () => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "gray.600" : "gray.200";

  const [rolling, setRolling] = useState(false);
  const diceFaces = [
    "Create Your",
    "First Task!",
    "Create Your",
    "First Task!",
    "Create Your",
    "First Task!",
  ];
  const diceRollDelay = 1000; // Time (in milliseconds) between dice face changes

  const handleRollDice = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, diceRollDelay);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Tilt
        options={{
          scale: 1.2, // Adjust the scale for a larger dice
          max: 25,
          gyroscope: false,
        }}
      >
        <Box
          p={8} // Increase padding for a larger dice
          bgGradient="linear(to bottom, #fca5a5, #fcbacb)" // Customize the gradient colors
          borderRadius="50%" // Make it a circle to resemble a dice
          boxShadow="xl"
          textAlign="center"
          position="relative"
          transformstyle="preserve-3d"
          transition="transform 0.3s ease"
          borderTop={`1px solid ${borderColor}`}
          bgColor={colorMode === "light" ? "white" : "gray.700"}
          onClick={handleRollDice}
          onAnimationEnd={() => setRolling(false)}
          _hover={!rolling && { transform: "rotateY(10deg)" }}
          animation={rolling ? "diceRoll 2s infinite" : ""}
        >
          {diceFaces.map((face, index) => (
            <Text
              key={index}
              fontSize={{ base: "20px", md: "24px", lg: "28px" }} // Adjust font sizes for different faces
              fontWeight="bold"
              color="white" // Change text color to white for better visibility
              animation="bounce 1s infinite"
              mb={2}
              style={{ display: index === 0 ? "block" : "none" }}
            >
              {face}
            </Text>
          ))}
          {/* Shadow to create 3D effect */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="gray.400"
            opacity={0.2}
            borderRadius="50%" // Match the dice's border radius for a circle shadow
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
