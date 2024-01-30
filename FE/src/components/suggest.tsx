import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API } from "../libs/api";
import { RootState } from "../stores/store";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function suggest() {
  const auth = useSelector((state: RootState) => state.auth);
  const [Click, setClick] = useState({ user: 0 });

  async function getUser() {
    const response = await API.get(`/users`);
    const data = response.data.data.filter((u: any) => u.id != auth.auth.id);
    return data;
  }

  async function getFollowing() {
    const response = await API.get("/following");

    return response.data.data;
  }

  const { data: dataFollowing } = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const queryClient = useQueryClient();

  const { data: dataUser } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post(`follow`, Click);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function handleClickFollow(userId: number) {
    setClick({ user: userId });
    handleFollow();
  }

  return (
    <>
      <Box
        pos={"relative"}
        w={"22rem"}
        borderRadius={"15px"}
        p={4}
        bgColor={"#566357"}
        h={147}
        overflowY={"scroll"}
      >
        <Text color={"white"} mb={"1rem"}>
          Suggested for you
        </Text>

        {dataUser &&
          dataUser.map((d: any) => (
            <>
              <Box borderRadius={"10px"} w={"100%"} mb={"8px"}>
                <Box display={"flex"}>
                  <Box w={"70%"}>
                    <Avatar
                      float={"left"}
                      size={"sm"}
                      name="Dan Abrahmov"
                      src={d.profile_picture}
                      marginRight={"10px"}
                      marginTop={"4px"}
                    />
                    <Text>{d.fullname}</Text>
                    <Text marginTop={"-4px"} fontSize={"sm"} color={"gray.300"}>
                      @{d.username}
                    </Text>
                  </Box>
                  <Box>
                    <Button
                      color={"fff"}
                      colorScheme="teal"
                      variant="outline"
                      p={2}
                      fontSize={10}
                      borderRadius={20}
                      ml={"40px"}
                      onClick={() => handleClickFollow(d.id)}
                    >
                      {dataFollowing &&
                      dataFollowing.some((f: any) => f.id === d.id)
                        ? "Unfollow"
                        : "Follow"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          ))}

        {/* user */}

        <br />
      </Box>
    </>
  );
}
