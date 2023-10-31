import PasswordInput from "@/components/RegisterPage/PasswordInput";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const FormLogin = () => {
  const navigate = useNavigate();
  const { handleChange, handleLogin } = useLogin();
  return (
    <Card w={"50%"}>
      <CardHeader>
        <Heading textAlign={"center"}>Login</Heading>
      </CardHeader>
      <CardBody display={"flex"} flexDirection={"column"} flex={1} gap={5}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <PasswordInput name="password" handleChange={handleChange} />
        </FormControl>
      </CardBody>
      <CardFooter display={"flex"} gap={5} justifyContent={"space-between"}>
        <Button w={"48%"} onClick={() => navigate("/auth/register")}>
          Not registered yet? Register
        </Button>
        <Button w={"48%"} colorScheme="whatsapp" onClick={handleLogin}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormLogin;
