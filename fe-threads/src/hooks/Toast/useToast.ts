import { useToast as ChakraToast } from "@chakra-ui/react";

type ToastStatus = "success" | "warning" | "info" | "error" | undefined;

const useToast = () => {
  const chakraToast = ChakraToast();

  const toast = (title: string, description: string, status: ToastStatus) => {
    chakraToast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  return toast;
};

export default useToast;
