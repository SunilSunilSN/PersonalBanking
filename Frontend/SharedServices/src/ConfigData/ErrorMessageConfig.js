export const ErrorMessageConfig = {
  email: {
    Regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    ErrorMessage: "Invalid Email ID",
    NullMessage: "Please Enter Email ID",
  },
  loginPassword: {
    Regex: "^.+$",
    ErrorMessage: "Invalid Password",
    NullMessage: "Please Enter Password",
  },
  custId: {
    Regex: "^.+$",
    ErrorMessage: "Invalid Customer ID",
    NullMessage: "Please Enter Customer ID",
  },
  userName: {
    Regex: "^.+$",
    ErrorMessage: "Invalid User Name",
    NullMessage: "Please Enter User Name",
  },
  mobNo: {
    Regex: "^.+$",
    ErrorMessage: "Invalid Mobile Number",
    NullMessage: "Please Enter Mobile Number",
  },
  recentFrom : {
        Regex: "^.+$",
    ErrorMessage: "Invalid From Date",
    NullMessage: "Please Enter From Date",
  },
    recentTO : {
        Regex: "^.+$",
    ErrorMessage: "Invalid To Date",
    NullMessage: "Please Enter To Date",
  }
};
