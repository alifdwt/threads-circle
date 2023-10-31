import { API } from "@/config/api";
import useProfileSelector from "@/pages/Home/ProfileSelector/hooks/useProfileSelector";
import { FormInputData } from "@/types/ProfileId";
import ThreadAPI from "@/types/ThreadCardAPI";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const useThreads = () => {
  const { selectedProfile } = useProfileSelector();
  const [form, setForm] = useState<FormInputData>({
    content: "",
    image: "",
    userId: selectedProfile,
  });

  const { data: getThreads, refetch } = useQuery<ThreadAPI[]>({
    queryKey: ["thread"],
    queryFn: async () => await API.get("/threads").then((res) => res.data.data),
  });

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

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("image", form.image);

    await API.post("/thread", formData);

    refetch();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    form,
    getThreads,
    handleChange,
    handlePost,
    fileInputRef,
    handleButtonClick,
  };
};

export default useThreads;
