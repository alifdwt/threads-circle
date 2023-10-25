import { API } from "@/config/api";
import UserListAPI from "@/types/UserListAPI";
import { Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

const ProfileOptions = () => {
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/users");
      setProfiles(response.data.data);
    };
    fetchData();
  }, []);

  function selectedProfileId(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = parseInt(e.target.value);
    setSelectedProfile(selectedId);
    localStorage.setItem("selectedProfile", JSON.stringify(selectedId));
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      setSelectedProfile(JSON.parse(storedProfile));
    }
  }, []);

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
      {profiles.map((profile: UserListAPI) => (
        <option key={profile.id} value={profile.id}>
          {profile.full_name}
        </option>
      ))}
    </Select>
  );
};

export default ProfileOptions;
