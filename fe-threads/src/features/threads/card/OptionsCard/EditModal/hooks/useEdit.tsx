import { API } from "@/config/api";
import useToast from "@/hooks/Toast/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const useEdit = (props: { identity: number; type: string }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const toast = useToast();
  const form = new FormData();

  let typeSingular = "";
  if (props.type === "replies") {
    typeSingular = "reply";
  } else if (props.type === "threads") {
    typeSingular = "thread";
  }

  const mutation = useMutation({
    mutationFn: (editedThread: any) =>
      API.patch(`/${typeSingular}/${props.identity}`, editedThread),
    onSuccess: () => {
      toast("Success", "Thread edited", "success");
      queryClient.invalidateQueries({ queryKey: ["thread"] });
    },
    onError: (error: any) => {
      toast("Error", error.response.data.message, "error");
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleEdit = () => {
    form.append("content", content);
    form.append("image", image as File);
    mutation.mutate(form);

    setContent("");
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
    content,
    image,
    setImage,
    mutation,
    handleChange,
    handleEdit,
    handleFileUpload,
  };
};

export default useEdit;
