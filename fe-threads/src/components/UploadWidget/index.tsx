import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";

const UploadWidget = () => {
  const [cloudinary, setCloudinary] = useState(null);
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    setCloudinary(window.cloudinary);
    if (window.cloudinary) {
      const newWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dxirtmo5t",
          uploadPreset: "peg7fz8v",
          folder: "Circle",
        },
        function (error, result) {
          if (!error && result && result.event === "success") {
            console.log(result.info.secure_url);
          }
        }
      );
      setWidget(newWidget);
    }
  }, []);
  return (
    <Button
      onClick={() => widget?.open()}
      variant={"link"}
      color={"green"}
      size={"lg"}
    >
      <BiImageAdd />
    </Button>
  );
};

export default UploadWidget;
