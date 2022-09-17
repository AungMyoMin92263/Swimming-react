

export const refreshHeaderOptionToken = () => {
  let token = ""
  const authUser = JSON.parse(localStorage.getItem("authUser") || "null");
  if (authUser && authUser.userInfo) {
    token = authUser.userInfo.token;
  }

  let option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let optionImage = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Accept': "application/json",
      'type': "formData",
      Authorization: `Bearer ${token}`,
    },
  };
  return { option, optionImage }
}