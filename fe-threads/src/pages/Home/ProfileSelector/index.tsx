import { Select } from "@chakra-ui/react";
import UserListAPI from "@/types/UserListAPI";
import useRegister from "@/components/RegisterPage/hooks/useRegister";
import useProfileSelector from "./hooks/useProfileSelector";

const ProfileSelector = () => {
  const { getUsers } = useRegister();
  const { selectedProfile, selectedProfileId } = useProfileSelector();
  return (
    <Select
      placeholder="Select profile"
      bg="white"
      color={"black"}
      name="profile"
      id="profile"
      value={selectedProfile}
      onChange={selectedProfileId}
    >
      {getUsers?.map((profile: UserListAPI) => (
        <option key={profile.id} value={profile.id}>
          {profile.full_name}
        </option>
      ))}
    </Select>
  );
};

export default ProfileSelector;
