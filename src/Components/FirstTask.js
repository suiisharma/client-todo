import React from 'react';
import {Tilt} from 'react-tilt';
import { Box, Heading, Text, useColorModeValue, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const glowingBlueShadow = keyframes`
  0% {
    box-shadow: 0 20px 25px -5px rgba(66, 153, 225, 0.1), 0 10px 10px -5px rgba(66, 153, 225, 0.04);
  }
  50% {
    box-shadow: 0 20px 25px -5px rgba(66, 153, 225, 0.2), 0 10px 10px -5px rgba(66, 153, 225, 0.1);
  }
  100% {
    box-shadow: 0 20px 25px -5px rgba(66, 153, 225, 0.1), 0 10px 10px -5px rgba(66, 153, 225, 0.04);
  }
`;

const FirstTaskCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <motion.div
      initial={{ scale: 0.95, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Tilt className="Tilt" options={{ max: 25 }}>
        <Box
          bg={cardBg}
          boxShadow={`0 20px 25px -5px rgba(66, 153, 225, 0.1), 0 10px 10px -5px rgba(66, 153, 225, 0.04)`}
          animation={`${glowingBlueShadow} 5s ease-in-out infinite`}
          backdropFilter="blur(10px)"
          borderRadius="md"
          padding="6"
          textAlign="center"
          maxW="md"
        >
          <Heading
            as="h3"
            size="xl"
            mb="4"
            color={useColorModeValue('gray.800', 'gray.200')}
            animation="bounce 1s infinite"
          >
            Create Your First Task!
          </Heading>
          <Text fontSize="md" color={useColorModeValue('gray.500', 'gray.400')}>
            Get started by creating your first task.
          </Text>
        </Box>
      </Tilt>
    </motion.div>
  );
};

export default FirstTaskCard;