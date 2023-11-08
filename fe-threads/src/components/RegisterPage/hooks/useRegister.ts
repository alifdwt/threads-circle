import { API } from "@/config/api";
import useToast from "@/hooks/Toast/useToast";
import UserListAPI from "@/types/UserListAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, ChangeEvent } from "react";

const useRegister = () => {
  const queryClient = useQueryClient();
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
  const [image, setImage] = useState<File | null>(null);
  const formData = new FormData();
  const toast = useToast();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    if (event.target.value !== form.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const mutation = useMutation({
    mutationFn: (newRegister: any) => API.post("/user", newRegister),
    onSuccess: () => {
      toast("Success", "Registration success", "success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast("Error", error.response.data.error, "error");
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = () => {
    formData.append("username", form.username);
    formData.append("full_name", form.full_name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profile_picture", image as File);
    formData.append("profile_description", form.profile_description);

    mutation.mutate(formData);

    setImage(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.id = "image";
    input.name = "image";
    //@ts-ignore
    input.onchange = handleFileChange;
    input.click();
  };

  return {
    form,
    mutation,
    image,
    setImage,
    handleChange,
    handleRegister,
    handlePasswordChange,
    passwordValue,
    passwordError,
    handleFileUpload,
  };
};

export default useRegister;
