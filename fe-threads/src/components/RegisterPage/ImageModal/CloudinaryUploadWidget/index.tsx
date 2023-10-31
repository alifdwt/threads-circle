import { Button } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";

const CloudinaryScriptContext = createContext(false);

type CloudinaryScriptProps = {
  cloudName: string;
  uploadPreset: string;
  folder: string;
};

const CloudinaryUploadWidget = (props: {
  uwConfig: CloudinaryScriptProps;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializedCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        props.uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            props.setPublicId(result.info.public_id);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={loaded}>
      <Button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializedCloudinaryWidget}
        colorScheme="teal"
      >
        Upload Image
      </Button>
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
