// import { RootState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
import { useState, ChangeEvent } from "react";
import useToast from "@/hooks/Toast/useToast";
import { API } from "@/config/api";

const useCreateThread = () => {
  const queryClient = useQueryClient();
  // const { user, accessToken } = useSelector((state: RootState) => state.user);
  const [thread, setThread] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const toast = useToast();
  const form = new FormData();

  const mutation = useMutation({
    mutationFn: (newThread: any) => API.post("/thread", newThread),

    onSuccess: () => {
      toast("Success", "Thread created", "success");
      queryClient.invalidateQueries({ queryKey: ["thread"] });
    },
    onError: (error: any) =>
      toast("Error", error.response.data.message, "error"),
  });

  const handleThreadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThread(event.target.value);
  };

  const handlePost = () => {
    form.append("content", thread);
    form.append("image", image as File);
    mutation.mutate(form);

    setThread("");
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
    thread,
    image,
    setImage,
    mutation,
    // user,
    handlePost,
    handleThreadChange,
    handleFileUpload,
  };
};

export default useCreateThread;
