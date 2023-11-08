import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN } from "@/store/RootReducer";
import { API } from "@/config/api";
import useToast from "../Toast/useToast";

type UserLogin = {
  email: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const [form, setForm] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/user/login", form);
      toast("Success", "Login success", "success");

      dispatch(AUTH_LOGIN(response.data));

      navigate("/home");
    } catch (error) {
      console.log(error);
      toast("Error", error.response.data.error, "error");
    }
  };

  return { form, handleChange, handleLogin };
};

export default useLogin;
