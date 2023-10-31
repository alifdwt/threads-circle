import { useState, useEffect, ChangeEvent } from "react";

const useProfileSelector = () => {
  const [selectedProfile, setSelectedProfile] = useState<number>(1);

  function selectedProfileId(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = parseInt(e.target.value);
    setSelectedProfile(selectedId);
    localStorage.setItem("selectedProfile", JSON.stringify(selectedId));
    window.location.href = "/home";
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      setSelectedProfile(JSON.parse(storedProfile));
    }
  }, [selectedProfile]);

  return {
    selectedProfile,
    selectedProfileId,
  };
};

export default useProfileSelector;
