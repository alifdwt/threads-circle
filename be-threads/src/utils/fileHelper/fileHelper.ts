import * as fs from "fs";

export const deleteFile = (path: string) => {
  // cek apakah file exist
  if (fs.existsSync(`src/uploads/${path}`)) {
    // delete file
    fs.unlinkSync(`src/uploads/${path}`);
  }
};
