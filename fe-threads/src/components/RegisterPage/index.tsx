import { Box } from "@chakra-ui/react";
import FormRegister from "./FormRegister";

const RegisterPage = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      bgGradient="linear(109.6deg,  rgba(61,131,97,1) 11.2%, rgba(28,103,88,1) 91.1%)"
    >
      <FormRegister />
      {/* <Box display={"flex"} gap={2}>
          <Text color={"white"}>Already have account?</Text>
          <Text
            color={"green"}
            cursor={"pointer"}
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Text>
        </Box> */}
    </Box>
  );
};

export default RegisterPage;
