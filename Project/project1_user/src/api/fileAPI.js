import axios from "axios";

const url =
  process.env.VUE_APP_FILES_BE_API_URL || "http://localhost:8080/users";

export async function findAllfileList() {
  try {
    const result = await axios.get(`${url}/list`);
    return result.data;
  } catch (err) {
    console.log("error: findAllfileList", err);
  }
}

export async function uploadFile(formData) {
  try {
    const result = await axios.post(`${url}/upload`, formData, {
      headers: { "Content-Type": `application/json` },
    });
    return result.data;
  } catch (err) {
    console.log("error: uploadFile", err);
  }
}
