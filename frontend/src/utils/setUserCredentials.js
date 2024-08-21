// Set user credentials in local storage
const setUserCredentials = (user, accessToken) => {
  console.log("Setting user credentials", user);
  localStorage.setItem("bb_user", user);
  localStorage.setItem("bb_token", btoa(accessToken));
};

export { setUserCredentials };
