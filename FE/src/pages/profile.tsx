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
import React, { ChangeEvent, useEffect, useState } from "react";
import Navbar1 from "../components/navbar";
import Mini_card from "../components/mini_card";
import Suggest from "../components/suggest";
import { RiImageEditFill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { UserAPI } from "../types/user";
import { API } from "../libs/api";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "../stores/slices/authSlice";

export default function profile() {
  // const token = localStorage.getItem("token") + "";
  // const user = jwtDecode<{ User: UserAPI }>(token);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserAPI[]>([]);
  const [preImg, setPreimg] = useState("");
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    profile_picture: "",
    profile_description: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
      const img = URL.createObjectURL(files[0]);
      setPreimg(img);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    let formData = new FormData();

    formData.append("fullname", form.fullname);
    formData.append("username", form.username);
    formData.append("profile_picture", form.profile_picture);
    formData.append("profile_description", form.profile_description);

    const res = await API.patch("/users", formData);
    console.log("ini res", res.data);

    dispatch(AUTH_LOGIN(res.data));
  }

  // useEffect(() => {
  //   auth;
  // }, [auth]);
  // console.log(auth.auth);

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
                            src={auth.auth.profile_picture}
                          />
                        </Box>
                        <Text>{auth.auth.fullname}</Text>
                        <Text fontSize={"sm"} color={"gray.300"}>
                          @{auth.auth.username}
                        </Text>
                        <Text>{auth.auth.profile_description}</Text>
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
                  <form encType="multipart/form-data" action="">
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
                        <input
                          name="profile_picture"
                          id="post-id"
                          type="file"
                          hidden
                        />
                        <Icon
                          marginLeft={"-25px"}
                          boxSize={"30px"}
                          as={RiImageEditFill}
                        />
                      </label>
                    </Box>
                    <label htmlFor="fullname">
                      Edit fullname
                      <Input
                        value={form.fullname}
                        onChange={handleChange}
                        name="fullname"
                        id="fullname"
                        placeholder="Edit Fullname"
                      />
                    </label>
                    <label htmlFor="username">
                      Username
                      <Input
                        value={form.username}
                        name="username"
                        onChange={handleChange}
                        id="username"
                        placeholder="Edit username"
                      />
                    </label>
                    <label htmlFor="bio">
                      Add Bio
                      <Input
                        value={form.profile_description}
                        onChange={handleChange}
                        name="profile_description"
                        id="bio"
                        placeholder="Edit Fullname"
                      />
                    </label>

                    <Button onClick={handleSubmit}>submit</Button>
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
