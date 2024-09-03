import axios from "axios";

const url = "http://localhost:8080/users";

export async function findAllUsers() {
  try {
    const result = await axios.get(`${url}/all`);
    return result.data;
  } catch {
    console.log("error");
  }
}
