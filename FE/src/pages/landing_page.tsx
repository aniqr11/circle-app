import { useState } from "react";
import { Box, useColorMode,Button } from "@chakra-ui/react";
import Suggest from '../components/suggest'
import Navbar1 from "../components/navbar";
import Mini_card from '../components/mini_card'
import Center_page from './center_page'

export default function navbar() {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box display={"flex"}>
        <Box w={"19rem"} h={"100vh"} border={"10px"}>
          <Navbar1 />
        </Box>
        <Box height={"100vh"} mr={6} w={"42rem"} h={"100vh"} p={5}>
          <Center_page/>
        </Box>
        <Box pos={"fixed"} right={14} top={3} w={"19rem"} h={"100vh"}>
          <Mini_card/>
          <Suggest/>
        </Box>
      </Box>

    </>
  );
}
          // <button style={{ marginLeft: "1000px" }} onClick={toggleColorMode}>
          //   dark
          // </button>
     
