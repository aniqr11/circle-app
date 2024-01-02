import { Box, Text } from "@chakra-ui/react";
import Navbar1 from "../components/navbar";
import Mini_card from "../components/mini_card";
import Suggest from "../components/suggest";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function list_follow() {
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
              <Tab w={"50%"}>Following</Tab>
              <Tab w={"50%"}>Followers</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
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
