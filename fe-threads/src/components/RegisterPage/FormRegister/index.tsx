import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import PasswordInput from "../PasswordInput";
import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { BiSolidImageAdd } from "react-icons/bi";

const FormRegister = () => {
  const navigate = useNavigate();
  const {
    handleChange,
    handleRegister,
    handlePasswordChange,
    passwordError,
    handleButtonClick,
  } = useRegister();
  return (
    <Card w={"70%"}>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <CardHeader>
          <Heading textAlign={"center"}>Register</Heading>
        </CardHeader>
        <CardBody display={"flex"} justifyContent={"space-between"} gap={5}>
          <Flex flexDirection={"column"} flex={1} gap={5}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name="full_name" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="profile_description"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              <Box>
                <label htmlFor="file-upload">
                  <Button
                    as="span"
                    colorScheme="blue"
                    size="md"
                    p={4}
                    boxShadow="lg"
                    cursor="pointer"
                    onClick={handleButtonClick}
                  >
                    <BiSolidImageAdd /> Choose File
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="profile_picture"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
          </Flex>
          <Flex flexDirection={"column"} flex={1} gap={5}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="text" name="email" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <PasswordInput name="password" handleChange={handleChange} />
            </FormControl>
            <FormControl isInvalid={!!passwordError}>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInput
                name="confirm_password"
                handleChange={handlePasswordChange}
              />
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>
          </Flex>
        </CardBody>
        <CardFooter display={"flex"} gap={5} justifyContent={"space-between"}>
          <Button w={"48%"} onClick={() => navigate("/auth/login")}>
            Already have an account? Login
          </Button>
          <Button w={"48%"} colorScheme="whatsapp" type="submit">
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FormRegister;
