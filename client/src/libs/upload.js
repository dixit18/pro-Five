import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "wjdcctyu");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dvy5v1l8h/image/upload",
      data
    );
    const { url } = res.data;
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
};
export default upload;
