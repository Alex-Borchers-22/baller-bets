// Set user credentials in local storage
const setUserCredentials = (user, accessToken) => {
  // If user is an object, convert to string
  const userString = typeof user === "object" ? JSON.stringify(user) : user;
  localStorage.setItem("bb_user", userString);
  localStorage.setItem("bb_token", btoa(accessToken));
};

export { setUserCredentials };
