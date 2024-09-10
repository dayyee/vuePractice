import axios from "axios";

const url = "http://localhost:8080/users";

export async function findAllUsers() {
  try {
    const result = await axios.get(`${url}/all`);
    return result.data;
  } catch (err) {
    console.log("error: findAllUsers", err);
  }
}

export async function findUserById(id) {
  try {
    const result = await axios.get(`${url}/${id}`);
    return result.data;
  } catch (err) {
    console.log("error: findUserById", err);
  }
}

export async function updateUserById(formData) {
  if (!formData.id) {
    console.error("Error: formData.id is undefined or null.");
    return;
  }
  try {
    const result = await axios.put(`${url}/${formData.id}`, formData, {
      headers: { "Content-Type": `application/json` },
    });
    return result.data;
  } catch (err) {
    console.log("error : updateUserById", err);
  }
}

export async function findSubjectById(id) {
  try {
    const result = await axios.get(`${url}/detail/${id}`);
    return result.data;
  } catch (err) {
    console.log("error: findSubjectById", err);
  }
}

export async function removeUserById(id) {
  try {
    const result = await axios.delete(`${url}/${id}`);
    return result.data;
  } catch (err) {
    console.log("error: removeUserById", err);
  }
}

export async function findDataByKeyWord(keyValue) {
  try {
    // console.log(keyValue);
    if (typeof keyValue == "string") {
      const result = await axios.get(`${url}/search`, {
        params: { name: keyValue },
      });
      if (Object.keys(result.data).length <= 0) {
        return 0;
      } else {
        return result.data;
      }
    } else if (typeof keyValue == "number") {
      const result = await axios.get(`${url}/search`, {
        params: { id: keyValue },
      });
      if (Object.keys(result.data).length <= 0) {
        return 0;
      } else {
        return result.data;
      }
    }
  } catch (err) {
    console.log("error: findDataByKeyWord", err);
  }
}
