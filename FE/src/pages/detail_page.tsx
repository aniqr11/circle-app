import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Text,
  Avatar,
  Button,
  Icon,
  Image,
  Link as ChakraLink,
  Input,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import Suggest from "../components/suggest";
import Navbar1 from "../components/navbar";
import Mini_card from "../components/mini_card";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { API } from "../libs/api";
import ThreadsInterface, { ReplyInterface } from "../types/threads";
import { IoSend } from "react-icons/io5";
import ReplyBar from "../components/reply_bar";
import moment from "moment";

export default function detailPage() {
  // const [showReply, setShowReply] = useState<boolean>(false);
  const [data1, setData] = useState<ThreadsInterface[]>([]);
  const [replyGet, setReplyGet] = useState<ReplyInterface[]>([]);
  const { id } = useParams();
  const [createRep, setCreateRep] = useState({});
  const [form, setForm] = useState({
    image: "",
    content: "",
  });

  async function getThreads() {
    const response = await API.get(`/threads/${id}`);
    setData(response.data.data);
  }

  async function getReply() {
    const response = await API.get(`/reply/${id}`);
    setReplyGet(response.data.data);
  }

  // const query = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getReply,
  // });

  // console.log("Data", query.data);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
      // const img = URL.createObjectURL(files[0]);
      // setPreimg(img);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    // let formData = new FormData();

    // formData.append("content", form.content);
    // formData.append("image", form.image);

    const res = await API.post("/reply", {
      content: form.content,
      thread: id,
    });
    if (res.data.massage) {
    }
    setCreateRep(res.data.data);
    setForm({
      image: "",
      content: "",
    });
  }

  useEffect(() => {
    getThreads();
    getReply();
  }, [createRep]);

  return (
    <>
      <Box display={"flex"}>
        <Box w={"19rem"} h={"100vh"} border={"10px"}>
          <Navbar1 />
        </Box>

        <Box height={"100vh"} mr={6} w={"42rem"} h={"100vh"} p={5}>
          <ChakraLink as={ReactRouterLink} to="/home">
            <Box display={"flex"}>
              <Icon mr={"10px"} boxSize={"40px"} as={IoArrowBackOutline} />
              <Text fontWeight={"bold"} fontSize={"30px"}>
                Status
              </Text>
            </Box>
          </ChakraLink>

          <Box
            display={"flex"}
            borderBottomWidth={"2px"}
            borderRightWidth={"2px"}
            borderColor="green"
          >
            {data1[0] ? (
              <>
                <Box mr={3}>
                  <Avatar
                    borderWidth={1}
                    borderColor={"white"}
                    size="sm"
                    name="Kent Dodds"
                    src={data1[0].user.profile_picture}
                  />
                </Box>
                <Box>
                  <Text mb={1} fontWeight={"bold"}>
                    {data1[0].user.fullname}
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        color: "gray",
                      }}
                    >
                      @{data1[0].user.username}•{" "}
                      {moment(data1[0].created_at + "")
                        .startOf("minute")
                        .fromNow()}{" "}
                    </span>
                  </Text>
                  <Box w={"600px"}>
                    <Text fontSize={"14px"}>{data1[0].content}</Text>
                    <Image
                      boxSize="350px"
                      h={"200px"}
                      objectFit="cover"
                      src={data1[0].image}
                      alt="Dan Abramov"
                    />
                    <Button bg={"transparent"}>
                      <Icon color="red" as={FaHeart} />
                    </Button>
                    11
                    <Button bg={"transparent"}>
                      <Icon as={BiCommentDetail} />
                    </Button>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        color: "gray",
                      }}
                    >
                      Comment below
                    </span>
                  </Box>

                  {/* form Reply */}
                  <Box display={"flex"}>
                    <Avatar
                      borderWidth={1}
                      borderColor={"white"}
                      mb={8}
                      mr={3}
                      size="sm"
                      name="Kent Dodds"
                      src={data1[0].user.profile_picture}
                    />

                    <form
                      style={{ width: "90%", display: "flex" }}
                      encType="multipart/form-data"
                    >
                      <Box w={"100%"} mr={1}>
                        <Input
                          placeholder="Comment here...."
                          type="text"
                          name="content"
                          onChange={handleChange}
                          value={form.content}
                        />
                      </Box>

                      <Button
                        onClick={handleSubmit}
                        colorScheme="green"
                        size="sm"
                      >
                        <Icon boxSize={4} as={IoSend} />
                      </Button>
                    </form>
                  </Box>
                </Box>
              </>
            ) : (
              "oading"
            )}
          </Box>
          <Box>
            <Text
              marginTop={"20px"}
              marginBottom={"20px"}
              textDecoration={"underline"}
              textDecorationColor={"green"}
              textDecorationThickness={"5px"}
              fontSize={"25px"}
              textAlign={"center"}
            >
              All comments
            </Text>
            {replyGet.length > 0 &&
              replyGet.map((r: ReplyInterface) => (
                <ReplyBar
                  profile_picture={r.user.profile_picture}
                  username={r.user.username}
                  fullname={r.user.fullname}
                  content={r.content}
                  date={moment(r.created_at).startOf("minute").fromNow()}
                />
              ))}
          </Box>
        </Box>
      </Box>
      <Box pos={"fixed"} right={14} top={3} w={"19rem"} h={"100vh"}>
        <Mini_card />
        <Suggest />
      </Box>
    </>
  );
}
