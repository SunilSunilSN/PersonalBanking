export const APIConfig = {
  createUserAPI: {
    method: "POST",
    service: "REACT_APP_USERMANGMENT_MICROSERICE",
    headers: {
      "Content-Type": "application/json",
    },
    enpointurl: "/user/createUser",
  },
  loginUserAPI: {
    method: "POST",
    service: "REACT_APP_USERMANGMENT_MICROSERICE",
    headers: {
      "Content-Type": "application/json",
    },
    enpointurl: "/user/userLogin",
    credentials: "include"
  },
  logoutAPI: {
    method: "GET",
    service: "REACT_APP_USERMANGMENT_MICROSERICE",
    headers: {
      "Content-Type": "application/json",
    },
    enpointurl: "/user/logout", 
    credentials: "include"
  },
  dashboardAPI: {
    method: "GET",
    service: "REACT_APP_USERMANGMENT_MICROSERICE",
    headers: {
      "Content-Type": "application/json",
    },
    enpointurl: "/user/getDashboard",
    credentials: "include"
  },
};
