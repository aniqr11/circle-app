import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function replyBar(props: any) {
  return (
    <>
      <Box
        paddingY={"10px"}
        borderRightWidth={"2px"}
        borderBottomWidth={"2px"}
        borderColor={"grey"}
      >
        <Box display={"flex"}>
          <Avatar
            borderWidth={1}
            borderColor={"white"}
            mr={3}
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
          <Text fontWeight={"bold"}>
            {props.fullname}
            <span
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "gray",
              }}
            >
              @{props.username}• {props.date}
            </span>
          </Text>
        </Box>
        <Box marginTop={"10px"} marginLeft={"43px"} w={"75%"}>
          <Text>{props.content}</Text>
        </Box>
      </Box>
    </>
  );
}
