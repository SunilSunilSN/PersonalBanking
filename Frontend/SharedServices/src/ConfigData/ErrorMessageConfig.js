
export const ErrorMessageConfig = {
  loginEmail: {
    Regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    ErrorMessage: "Invalid Email ID",
    NullMessage: "Please Enter Email ID"
  },
  loginPassword: {
    Regex: "^.+$",
    ErrorMessage: "Invalid Password",
    NullMessage: "Please Enter Password"
  },
  custId: {
    Regex: "^.+$",
    ErrorMessage: "Invalid Customer ID",
    NullMessage: "Please Enter Customer ID"
  }
};
