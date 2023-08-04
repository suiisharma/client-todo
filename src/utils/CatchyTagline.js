import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Text, Button, useColorMode} from "@chakra-ui/react";
import "./CatchyTagline.css"
import { Link } from "react-router-dom";


const CatchyTagline = () => {
  const { colorMode} = useColorMode();
  return (
    <Box
      bgColor={colorMode==='light'? 'light':'dark'}
      color={colorMode==='light'? 'dark':'light'}
      p={8}
      textAlign="center"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.4s ease",
      }}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Master Your Day, Any Way!
      </Text>
      <Text fontSize="md" mb={4}>
        Introducing TaskTonic: Your Ultimate Todo Assistant!
      </Text>
      <Link  to="/todo">
      <Button
       rightIcon={<ArrowRightIcon animation={"pop 1s infinite"}></ArrowRightIcon>}
        colorScheme="teal"
        size="md"
        px={8}
        py={4}
        fontWeight="bold"
        borderRadius="full"
      >
       Todo
       </Button>
       </Link>
    </Box>
  );
};

export default CatchyTagline;
