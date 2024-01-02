import {
  Avatar,
  Box,
  Button,
  Icon,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Navbar1 from "../components/navbar";
import Mini_card from "../components/mini_card";
import Suggest from "../components/suggest";
import { RiImageEditFill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { UserAPI } from "../types/user";

export default function profile() {
  const token = localStorage.getItem("token") + "";
  const user = jwtDecode<{ User: UserAPI }>(token);

  return (
    <>
      <Box display={"flex"}>
        <Box w={"19rem"} h={"100vh"} border={"10px"}>
          <Navbar1 />
        </Box>

        {/* center */}
        <Box w={"42rem"} h={"100vh"}>
          <Text
            mb={"25px"}
            fontSize={"40px"}
            fontWeight={"bold"}
            textAlign={"center"}
            textDecoration={"underline"}
          >
            Profile
          </Text>

          <Tabs>
            <TabList>
              <Tab fontSize={"20px"} fontWeight={"bold"} w={"50%"}>
                Detail Profile
              </Tab>
              <Tab fontSize={"20px"} fontWeight={"bold"} w={"50%"}>
                Edit Profile
              </Tab>
            </TabList>

            {/* panel detail */}
            <TabPanels>
              <TabPanel>
                <Box display={"flex"}>
                  {/* center */}
                  <Box marginLeft={"10px"} w={"42rem"} h={"100vh"}>
                    <Box
                      w={"100%"}
                      borderRadius={"15px"}
                      p={4}
                      bgColor={"#566357"}
                      marginBottom={1}
                    >
                      <Box
                        borderRadius={"10px"}
                        w={"100%"}
                        h={"4rem"}
                        bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
                      ></Box>

                      <Box>
                        <Box w={"fit-content"} display={"flex"} margin={"auto"}>
                          <Avatar
                            size={"2xl"}
                            marginTop={"-25px"}
                            borderWidth={2}
                            borderColor={"white"}
                            name="Segun Adebayo"
                            src={user.User.profile_picture}
                          />
                        </Box>
                        <Text>{user.User.fullname}</Text>
                        <Text fontSize={"sm"} color={"gray.300"}>
                          @{user.User.username}
                        </Text>
                        <Text>picked by worms,who eat bikini bottom</Text>
                        <Text>
                          23 <span style={{ fontSize: "14px" }}>Following</span>{" "}
                          291{" "}
                          <span style={{ fontSize: "14px" }}>Followers </span>
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>

              {/* panel edit */}
              <TabPanel>
                <Box margin={"auto"}>
                  <form action="">
                    <Text fontWeight={"bold"} mb={"10px"} textAlign={"center"}>
                      Add image
                    </Text>

                    <Box textAlign={"center"}>
                      <label
                        style={{
                          cursor: "pointer",
                        }}
                        htmlFor="post-id"
                      >
                        <Avatar
                          size={"2xl"}
                          borderWidth={2}
                          borderColor={"white"}
                          name="Segun Adebayo"
                          src=""
                        />
                        <input name="image" id="post-id" type="file" hidden />
                        <Icon
                          marginLeft={"-25px"}
                          boxSize={"30px"}
                          as={RiImageEditFill}
                        />
                      </label>
                    </Box>
                    <label htmlFor="fullname">
                      Edit fullname
                      <Input id="fullname" placeholder="Edit Fullname" />
                    </label>
                    <label htmlFor="username">
                      Username
                      <Input id="username" placeholder="Edit username" />
                    </label>
                    <label htmlFor="bio">
                      Add Bio
                      <Input id="bio" placeholder="Edit Fullname" />
                    </label>
                  </form>
                </Box>
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
