import { API } from "@/config/api";
// import userDummy from "@/mocks/user";
import UserListAPI from "@/types/UserListAPI";
import { useQuery } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<UserListAPI>({
    username: "",
    full_name: "",
    email: "",
    password: "",
    profile_picture: "",
    profile_description: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  console.log(passwordValue);

  const { data: getUsers, refetch } = useQuery<UserListAPI>({
    queryKey: ["users"],
    queryFn: async () => await API.get("/users").then((res) => res.data.data),
  });

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    if (event.target.value !== form.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  // console.log(form);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("full_name", form.full_name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profile_picture", form.profile_picture);
    formData.append("profile_description", form.profile_description);

    try {
      await API.post("/user", formData);
      // Add the navigation here
      navigate("/auth/login");
      refetch(); // Optional, if you want to refetch the data after successful registration
    } catch (error) {
      // Handle error if the API request fails
      console.error("Registration failed", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    form,
    handleChange,
    handleRegister,
    handlePasswordChange,
    passwordError,
    handleButtonClick,
    fileInputRef,
    getUsers,
  };
};

export default useRegister;
