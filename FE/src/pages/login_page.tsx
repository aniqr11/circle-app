import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../libs/api";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "../stores/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({});
  const [user, setUser] = useState("");
  const handleChange = (
    event: ChangeEvent<{ name: string; value: string }>
  ) => {
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
    // console.log(event,userForm);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };
    const response = await API.post("/login", userForm, { headers });
    // console.log(response);
    // const token = response.data.token
    // localStorage.setItem("token", token)

    // console.log(response.data);
    // SetAuthToken(token)

    dispatch(AUTH_LOGIN(response.data));

    navigate("/home");
  };

  return (
    <>
      <Box pt={"10rem"} margin={"auto"} w={"17rem"} h={"100vh"}>
        <Text fontWeight={"bold"} color={"green"} fontSize={"30px"}>
          CIRCLE
        </Text>
        <Box w={"100%"}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />

              <FormLabel mt={"20px"} htmlFor="password">
                Password
              </FormLabel>
              <Input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
              />

              <Button
                type="submit"
                mt={"20px"}
                w={"100%"}
                bg={"green"}
                colorScheme="green"
                size="md"
              >
                Login
              </Button>
              <Text mt={"10px"}>
                Not have account ?.{" "}
                <Link style={{ color: "lightskyblue" }} to="/register">
                  Register here
                </Link>
              </Text>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}
