import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN } from "@/store/RootReducer";
import { API } from "@/config/api";

type UserLogin = {
  email: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      dispatch(AUTH_LOGIN(response.data));

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return { form, handleChange, handleLogin };
};

export default useLogin;
