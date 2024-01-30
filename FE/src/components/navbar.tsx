import { Box, Button, Icon, Switch, useColorMode } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { RiHomeHeartFill, RiUserSearchFill } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "../stores/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function navbar1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(AUTH_LOGOUT());
    navigate("/login");
  };

  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        w="19rem"
        h="100vh"
        pos={"fixed"}
        p={5}
        border={"2px"}
        borderColor={"green"}
      >
        <Text fontSize={"2rem"} fontWeight={"bold"} color={"green"} mb={"20px"}>
          CIRCLE
        </Text>

        {/* list-navbar */}
        <List spacing={5}>
          <ListItem>
            <Link to="/home">
              <Button bg={"none"}>
                <ListIcon
                  boxSize={"30px"}
                  as={RiHomeHeartFill}
                  color="green.500"
                />
                Home
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/search">
              <Button bg={"none"}>
                <ListIcon
                  boxSize={"30px"}
                  as={RiUserSearchFill}
                  color="green.500"
                />
                Search
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/follows">
              <Button bg={"none"}>
                <ListIcon
                  boxSize={"30px"}
                  as={BsFillHeartFill}
                  color="green.500"
                />
                Follows
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/profile">
              <Button bg={"none"}>
                <ListIcon boxSize={"30px"} as={CgProfile} color="green.500" />
                Profile
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/home">
              <Button
                color={"white"}
                borderRadius={"20px"}
                w={"100%"}
                bg={"green"}
              >
                Create post
              </Button>
            </Link>
          </ListItem>
        </List>

        <Box display={"flex"} mt={"200px"} justifyContent={"center"}>
          {/* <Button onClick={toggleColorMode}>hahahahahah</Button> */}
          <Button onClick={logout} colorScheme="black" variant="ghost">
            <Icon as={CiLogout} />
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
}
