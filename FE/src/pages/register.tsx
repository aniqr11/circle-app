// import React, { ChangeEvent, useState } from "react";
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
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await API.post("/register", form);
    console.log(response);
    navigate("/login");
  };

  // async function handleRegister() {
  //   try {
  //     const response = await API.post("/register", form);
  //     console.log(response);

  //     // window.location.href = "/auth/login";
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // console.log(form);

  return (
    <>
      <Box pt={"5rem"} margin={"auto"} w={"17rem"} h={"100vh"}>
        <Text fontWeight={"bold"} color={"green"} fontSize={"30px"}>
          CIRCLE
        </Text>
        <Box w={"100%"}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />

              <FormLabel htmlFor="fullname">Full name</FormLabel>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Fullname"
                onChange={handleChange}
              />

              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
              />

              <FormLabel mt={"20px"} htmlFor="password">
                Password
              </FormLabel>
              <Input
                id="password"
                onChange={handleChange}
                name="password"
                type="password"
              />

              <Button
                mt={"20px"}
                w={"100%"}
                bg={"green"}
                colorScheme="green"
                size="md"
                type="submit"
              >
                Register
              </Button>

              <Text mt={"10px"}>
                Already have account ?.{" "}
                <Link style={{ color: "lightskyblue" }} to="/login">
                  Login here
                </Link>
              </Text>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}
