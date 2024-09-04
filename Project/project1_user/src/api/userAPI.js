import axios from "axios";

const url = "http://localhost:8080/users";

export async function findAllUsers() {
  try {
    const result = await axios.get(`${url}/all`);
    return result.data;
  } catch {
    console.log("error: findAllUsers");
  }
}

export async function findUserById(id) {
  try {
    const result = await axios.get(`${url}/${id}`);
    return result.data;
  } catch {
    console.log("error: findUserById");
  }
}
