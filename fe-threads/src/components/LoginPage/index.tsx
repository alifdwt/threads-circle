import { Box, Text } from "@chakra-ui/react";
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
      // bgGradient="linear(to-l, #7928CA, #FF0080)"
    >
      <Text color={"#22c35e"}>Lorem ipsum Dolor sit Amet</Text>
      <FormLogin />
    </Box>
  );
};

export default LoginPage;
