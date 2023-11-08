import useToast from "@/hooks/Toast/useToast";
import { AUTH_LOGIN } from "@/store/RootReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type UserLogin = {
  email: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [form, setForm] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const formData = new FormData();

  const mutation = useMutation({
    mutationFn: (newLogin: any) => API.post("/user/login", newLogin),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      toast("Success", "Login success", "success");
      dispatch(AUTH_LOGIN(res.data));
      navigate("/home");
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

  const handleLogin = () => {
    formData.append("email", form.email);
    formData.append("password", form.password);

    mutation.mutate(formData);
  };

  return {
    form,
    mutation,
    handleChange,
    handleLogin,
  };
};

export default useLogin;
