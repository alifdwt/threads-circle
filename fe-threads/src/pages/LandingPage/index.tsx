import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minH="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Heading textAlign={"center"} color={"white"}>
        Ini adalah Landing Page
      </Heading>
      <Flex gap={4}>
        <Button onClick={() => navigate("/auth/register")}>Register</Button>
        <Button onClick={() => navigate("/auth/login")}>Login</Button>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
