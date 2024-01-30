import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import Navbar1 from "../components/navbar";
import Mini_card from "../components/mini_card";
import Suggest from "../components/suggest";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { API } from "../libs/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function list_follow() {
  const [Click, setClick] = useState({ user: 0 });
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
    queryKey: ["follower"],
    queryFn: getFollower,
  });

  const queryClient = useQueryClient();

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post(`follow`, Click);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
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
      <Box display={"flex"}>
        <Box w={"19rem"} h={"100vh"} border={"10px"}>
          <Navbar1 />
        </Box>

        {/* center */}
        <Box w={"42rem"} h={"100vh"}>
          <Text
            mb={"15px"}
            fontSize={"40px"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            List Follows
          </Text>

          <Tabs>
            <TabList>
              <Tab w={"50%"}>
                Following ({dataFollowing && dataFollowing.length})
              </Tab>
              <Tab w={"50%"}>
                Followers ({dataFollower && dataFollower.length})
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {dataFollowing &&
                  dataFollowing?.map((u: any) => (
                    <Box mb={"10px"} key={u.id}>
                      <Box
                        key={u.id}
                        margin={"auto"}
                        borderRadius={"10px"}
                        w={"90%"}
                      >
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
                              dataFollowing.some((f: any) => f.id === f.id)
                                ? "Unfollow"
                                : "Follow"}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </TabPanel>
              <TabPanel>
                {dataFollower &&
                  dataFollower.map((u: any) => (
                    <Box mb={"10px"} key={u.id}>
                      <Box
                        key={u.id}
                        margin={"auto"}
                        borderRadius={"10px"}
                        w={"90%"}
                      >
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
                  ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
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
