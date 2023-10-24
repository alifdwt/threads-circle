import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Avatar,
} from "@chakra-ui/react";

const ThreadForm = () => {
  return (
    <InputGroup size={"lg"} border={"1px solid transparent"}>
      <InputLeftElement width={"4.5rem"}>
        <Avatar
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
          size={"sm"}
          top={"2"}
        />
      </InputLeftElement>
      <Input
        placeholder="What is Happening"
        type="text"
        pr={"4.5rem"}
        pl={"4rem"}
        py={"2rem"}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" colorScheme="green">
          Post
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default ThreadForm;
