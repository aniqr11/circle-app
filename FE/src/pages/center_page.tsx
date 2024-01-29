import {
  Box,
  Text,
  Avatar,
  Button,
  Icon,
  Textarea,
  Image,
  Link as ChakraLink,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { API } from "../libs/api";
import { useQuery } from "@tanstack/react-query";
import ThreadsInterface from "../types/threads";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";

export default function center_page() {
  const [preImg, setPreimg] = useState("");
  // const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({
    image: "",
    content: "",
  });

  async function getThreads() {
    const response = await API.get("/threads");
    return response.data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getThreads,
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

    formData.append("content", form.content);
    formData.append("image", form.image);
    setLoad(true);

    await API.post("/threads", formData);
    setLoad(false);
    refetch();
    setForm({
      image: "",
      content: "",
    });
    setPreimg("");
  }

  // console.log(form);

  // const preview = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const img = URL.createObjectURL(e.target.files[0]);
  //     setPreimg(img);
  //   }
  // };
  // console.log(data);

  return (
    <>
      <Text fontWeight={"bold"}>HOME</Text>

      {/* box post */}
      <Box display={"flex"}>
        <Avatar
          borderWidth={1}
          borderColor={"white"}
          mb={8}
          mr={3}
          size="sm"
          name="Kent Dodds"
          src={auth.auth.profile_picture}
        />

        <form
          style={{ width: "90%", display: "flex" }}
          encType="multipart/form-data"
        >
          <Box w={"100%"} mr={1}>
            <Input
              type="text"
              name="content"
              value={form.content}
              onChange={handleChange}
            />
            {preImg && (
              <Box>
                <img src={preImg} alt="" />
                <Button
                  _hover={{
                    background: "gray",
                  }}
                  color={"red"}
                  display={"block"}
                  ml={"auto"}
                  onClick={() => setPreimg("")}
                  border={"none"}
                  bg={"none"}
                >
                  Cancel
                  <Icon ml={1} as={ImCancelCircle} />
                </Button>
              </Box>
            )}
          </Box>
          <Box>
            <label style={{ cursor: "pointer" }} htmlFor="post-id">
              <input
                name="image"
                id="post-id"
                type="file"
                hidden
                onChange={handleChange}
              />
              <Icon mr={"10px"} boxSize={7} as={RiImageAddFill} />
            </label>
          </Box>
          <Button onClick={handleSubmit} colorScheme="green" size="sm">
            Post
          </Button>
        </form>
      </Box>

      {/* box3 */}

      {!load &&
        data &&
        data.map((data: ThreadsInterface) => (
          <Box
            display={"flex"}
            key={data.id}
            borderBottomWidth={"2px"}
            borderRightWidth={"2px"}
            borderColor="green"
            paddingTop={"15px"}
          >
            <Box mr={3}>
              <Avatar
                borderWidth={1}
                borderColor={"white"}
                size="sm"
                name="Kent Dodds"
                src={data.user.profile_picture}
              />
            </Box>
            <Box>
              <Text mb={1} fontWeight={"bold"}>
                {data.user.fullname}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "normal",
                    color: "gray",
                    marginLeft: "5px",
                  }}
                >
                  @{data.user.username} •{" "}
                  {/* {new Date(data.created_at + "").toLocaleString()} */}
                  {moment(data.created_at).startOf("hour").fromNow()}
                </span>
              </Text>
              <Box w={"600px"}>
                <Link to={"/detail-page/" + data.id}>
                  <Text fontSize={"14px"}>{data.content}</Text>
                  <Image
                    boxSize="350px"
                    h={"200px"}
                    objectFit="cover"
                    src={data.image}
                    alt="Dan Abramov"
                  />
                </Link>
                <Button bg={"transparent"}>
                  <Icon color="red" as={FaHeart} />
                </Button>
                11
                <Link to={"/detail-page/" + data.id}>
                  <Button bg={"transparent"}>
                    <Icon mr={"-10px"} as={BiCommentDetail} />
                  </Button>
                  {data.reply.length}
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
    </>
  );
}

{
  /* box status

      {data && ()}
      <Box
        display={"flex"}
        borderBottomWidth={"2px"}
        borderRightWidth={"2px"}
        borderColor="green"
      >
        <Box mr={3}>
          <Avatar
           borderWidth={1}
           borderColor={"white"}
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
        </Box>
        <Box>
          <Text mb={1} fontWeight={"bold"}>
            Indah Pra kerja{" "}
            <span
              style={{ fontSize: "14px", fontWeight: "normal", color: "gray" }}
            >
              @indahpra• 4h ago
            </span>
          </Text>
          <Text fontSize={"14px"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            repellendus, totam exercitationem quasi quisquam cumque nesciunt
            corrupti, voluptate dolorum nostrum odio officia vel nihil, facilis
            ex eius. Vero quas dolore iste repellendus dolores enim ut iusto,
            cupiditate recusandae. Facere ab facilis ut in architecto
            consequatur voluptate quam minima? Incidunt, reprehenderit!
          </Text>
          <Button bg={"transparent"}>
            <Icon color="red" as={FaHeart} />
          </Button>
          11
          <Button bg={"transparent"}>
            <Icon as={BiCommentDetail} />
          </Button>
          333 replies
        </Box>
      </Box> */
}

{
  /* box 2 */
}
{
  /* <Box
        display={"flex"}
        borderBottomWidth={"2px"}
        borderRightWidth={"2px"}
        borderColor="green"
      >
        <Box mr={3}>
          <Avatar
           borderWidth={1}
           borderColor={"white"}
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
        </Box>
        <Box>
          <Text mb={1} fontWeight={"bold"}>
            Indah Pra kerja{" "}
            <span
              style={{ fontSize: "14px", fontWeight: "normal", color: "gray" }}
            >
              @indahpra• 4h ago
            </span>
          </Text>
          <Text fontSize={"14px"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            repellendus, totam exercitationem quasi quisquam cumque nesciunt
            corrupti, voluptate dolorum nostrum odio officia vel nihil, facilis
            ex eius. Vero quas dolore iste repellendus dolores enim ut iusto,
            cupiditate recusandae. Facere ab facilis ut in architecto
            consequatur voluptate quam minima? Incidunt, reprehenderit!
          </Text>
          <Button bg={"transparent"}>
            <Icon color="red" as={FaHeart} />
          </Button>
          11
          <Button bg={"transparent"}>
            <Icon as={BiCommentDetail} />
          </Button>
          333 replies
        </Box>
      </Box> */
}
