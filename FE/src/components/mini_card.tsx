import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { UserAPI } from "../types/user";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";
import { useQuery } from "@tanstack/react-query";
import { API } from "../libs/api";

export default function mini_card() {
  // const token = localStorage.getItem("token") + "";
  // const user = jwtDecode<{ User: UserAPI }>(token);
  const auth = useSelector((state: RootState) => state.auth);

  async function getFollowing() {
    const response = await API.get("/following");

    return response.data.data;
  }

  async function getFollower() {
    const response = await API.get("/follower");

    return response.data.data;
  }
  const { data: dataFollowing } = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const { data: dataFollower } = useQuery({
    queryKey: ["folower"],
    queryFn: getFollower,
  });

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
          <Text>"{!auth.auth.profile_description && "Tidak ada bio"}"</Text>
          <Text>
            {dataFollowing && dataFollowing.length}{" "}
            <span style={{ fontSize: "14px" }}>Following</span>{" "}
            {dataFollower && dataFollower.length}
            <span style={{ fontSize: "14px" }}> Followers </span>
          </Text>
        </Box>
      </Box>
    </>
  );
}
