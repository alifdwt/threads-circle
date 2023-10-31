import { Box } from "@chakra-ui/react";
import FormLogin from "./FormLogin";

const LoginPage = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      bgGradient="linear(to-l, #7928CA, #FF0080)"
    >
      <FormLogin />
    </Box>
  );
};

export default LoginPage;
