import { Box, Input, Icon, Button, Text, Avatar } from "@chakra-ui/react";
import Navbar1 from "../components/navbar";
import Mini_card from "../components/mini_card";
import Suggest from "../components/suggest";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import { API } from "../libs/api";
import { UserInterface } from "../types/threads";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function search_page() {
  const [filter, setFilter] = useState<UserInterface[]>([]);
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

  const { data: dataUser } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const { data: dataFollowing } = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const queryClient = useQueryClient();
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredUser = dataUser.filter((u: any) =>
      u.username.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilter(filteredUser);
  };

  return (
    <>
      {/* side-left */}
      <Box display={"flex"}>
        <Box w={"19rem"} h={"100vh"} border={"10px"}>
          <Navbar1 />
        </Box>

        {/* center */}
        <Box w={"42rem"} h={"100vh"}>
          <Text fontSize={"40px"} fontWeight={"bold"} textAlign={"center"}>
            Search user{" "}
          </Text>
          <Box
            bg={"black"}
            borderRadius={"10px"}
            p={1}
            display={"flex"}
            w={"100%"}
            marginLeft={"10px"}
            mb={"20px"}
          >
            <Input
              p={"8px"}
              h={"40px"}
              color={"white"}
              variant="unstyled"
              placeholder="search user..."
              onChange={handleSearch}
            />
            <Button>
              <Icon color={"white"} boxSize={"20px"} as={FaSearch} />
            </Button>
          </Box>
          {filter.length > 0 ? (
            filter.map((u) => (
              <Box mb={"10px"} key={u.id}>
                <Box key={u.id} margin={"auto"} borderRadius={"10px"} w={"90%"}>
                  <Box display={"flex"}>
                    <Box marginBottom={"10px"} w={"100%"}>
                      <Avatar
                        float={"left"}
                        size={"lg"}
                        name="Dan Abrahmov"
                        src={u.profile_picture}
                        marginRight={"10px"}
                        marginTop={"4px"}
                      />
                      <Text
                        fontWeight={"bold"}
                        marginTop={"5px"}
                        fontSize={"20px"}
                      >
                        {u.fullname}
                      </Text>
                      <Text
                        marginTop={"3px"}
                        fontSize={"15px"}
                        color={"gray.300"}
                        textDecoration={"underline"}
                      >
                        @{u.username}
                      </Text>
                    </Box>
                    <Box mt={"5px"}>
                      <Button
                        color={"fff"}
                        colorScheme="teal"
                        variant="outline"
                        p={2}
                        fontSize={20}
                        borderRadius={20}
                        ml={"40px"}
                        onClick={() => handleClickFollow(u.id)}
                      >
                        {dataFollowing &&
                        dataFollowing.some((f: any) => f.id === u.id)
                          ? "Unfollow"
                          : "Follow"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box
              display="flex"
              minH="sm"
              alignItems="center"
              justifyContent="center"
            >
              <Text textAlign="center">User Not Found</Text>
            </Box>
          )}
        </Box>

        {/* side-right */}
        <Box pos={"fixed"} right={14} top={3} w={"19rem"} h={"100vh"}>
          <Mini_card />
          <Suggest />
        </Box>
      </Box>
    </>
  );
}

{
  /* user */
}
