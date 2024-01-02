import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserInterface } from "../types/threads";
import { API } from "../libs/api";

export default function suggest() {
  const [data, setData] = useState<UserInterface[]>([]);

  async function getData() {
    const res = await API.get("/users");

    setData(res.data.data);
  }

  useEffect(() => {
    getData();
  }, []);
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

        {data &&
          data.map((d) => (
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
                    >
                      Follow
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
