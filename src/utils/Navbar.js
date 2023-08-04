import { Box, Flex, Button, useColorMode, Image } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import AppIcon from "../Images/TaskTonic_Logo.png";
import DarkAppIcon from "../Images/DarkMode.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode('dark');

  return (
    <Flex
      className="navbar"
      as="nav"
      align="center"
      justify="space-between"
      py={4}
      px={8}
      bgColor={colorMode === "light" ? "light" : "dark"}
      color={colorMode === "light" ? "black" : "white"}
    >
      <Box display="flex" alignItems="center">
        <Link to="/">
          <Image
            src={colorMode === "light" ? DarkAppIcon : AppIcon}
            alt="TaskTonic_Logo"
            width={"60px"}
            height={"50px"}
            mr={4}
          />{" "}
          </Link>
          <Box display={["none", "contents"]} fontSize="xl" fontWeight="bold">
            TaskTonic
          </Box>
      </Box>
      <Flex as="div" align="center">
        <Link to={"/"} style={{ "marginRight": "10px" }}>
          Home
        </Link>
        <Link to="/todo" style={{ "marginRight": "10px" }}>
          Todo
        </Link>
        <Link to="/profile" style={{ "marginRight": "10px" }}>
          Profile
        </Link>
        <Button
          className="navbar-button"
          size="md"
          variant="ghost"
          colorScheme="teal"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
