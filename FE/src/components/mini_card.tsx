import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { UserAPI } from "../types/user";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";

export default function mini_card() {
  // const token = localStorage.getItem("token") + "";
  // const user = jwtDecode<{ User: UserAPI }>(token);
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Box
        pos={"relative"}
        w={"22rem"}
        borderRadius={"15px"}
        p={4}
        bgColor={"#566357"}
        marginBottom={1}
      >
        <Text color={"white"} mb={"1rem"}>
          My Profile
        </Text>
        <Box
          borderRadius={"10px"}
          w={"100%"}
          h={"4rem"}
          bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
        ></Box>
        <Link to="/profile">
          <Button
            color={"fff"}
            pos={"absolute"}
            right={5}
            colorScheme="teal"
            variant="outline"
            p={2}
            fontSize={10}
            mt={2}
            borderRadius={20}
          >
            Edit profile
          </Button>
        </Link>
        <Box>
          <Box marginTop={"-25px"} marginLeft={"3"} marginBottom={4}>
            <Avatar
              size={"lg"}
              borderWidth={2}
              borderColor={"white"}
              name="Segun Adebayo"
              src={auth.auth.profile_picture}
            />
          </Box>
          <Text>{auth.auth.fullname}</Text>
          <Text fontSize={"sm"} color={"gray.300"}>
            @{auth.auth.username}
          </Text>
          <Text>❤ {auth.auth.profile_description} ❤</Text>
          <Text>
            23 <span style={{ fontSize: "14px" }}>Following</span> 291{" "}
            <span style={{ fontSize: "14px" }}>Followers </span>
          </Text>
        </Box>
      </Box>
    </>
  );
}
