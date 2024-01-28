import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiSolidUserDetail } from "react-icons/bi";

const SearchBox = (props: {
  searchTerm: string;
  onSearch: (term: string) => void;
}) => {
  return (
    <InputGroup>
      <InputLeftElement>
        <BiSolidUserDetail />
      </InputLeftElement>
      <Input
        variant="filled"
        type="text"
        placeholder="Search..."
        borderRadius={"full"}
        // bg={"whiteAlpha.300"}
        value={props.searchTerm}
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBox;
