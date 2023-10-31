import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Box } from "@chakra-ui/react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

const ImageModal = (props: { type: string; username: string }) => {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dxirtmo5t");
  const [uploadPreset] = useState("peg7fz8v");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: `Circle/${props.type}/${props.username}`,
    cropping: true,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  // console.log("ini myImage", myImage);

  return (
    <Box>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      {/* {myImage ? (<Avatar />) : (<Avatar  />)} */}
      <AdvancedImage cldImg={myImage} plugins={[responsive(), placeholder()]} />
    </Box>
  );
};

export default ImageModal;
