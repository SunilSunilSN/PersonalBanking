import React, { useRef, useState } from "react";
import { Field, Label, Input, ErrorMessage, Button } from "shared-services";
const RegistrationPage = () => {
  const Refs = {
    userNameRefId: { ref: useRef(null), field: "userName" },
    EmailRefId: { ref: useRef(null), field: "email" },
    MobileRefId: { ref: useRef(null), field: "mobNo" },
    PasswordRefId: { ref: useRef(null), field: "password" },
  };
  window.setShowSideBar(false);
  const [errors, setErrors] = useState({});
  const RegisterUser = async (req) => {
    const data = await window.ServerCall("createUserAPI", req);
    console.log(data);
    if (data.success) {
      window.launchMicroApp("login", "DashboardPage", "LoginId");
    } else {
      window.showAlert({
        AlertType: "E",
        AlertDesc: data.message,
        Btns: [{ Name: "Ok", function: () => console.log("Canceled") }],
      });
    }
  };
  const RegistrationCont = (e) => {
    if (!window.errorDisplayAll(Refs, setErrors)) {
      const req = {
        MobileNumber: Refs["MobileRefId"].ref.current.value,
        UserName: Refs["userNameRefId"].ref.current.value,
        EmailId: Refs["EmailRefId"].ref.current.value,
        Password: "Sunil@123",
        UserRole: "USER",
      };
      RegisterUser(req);
    }
  };
  const RegistrationCancel = (e) => {
    window.launchMicroApp("login", "LoginPage", "BaseScreenID");
  };
  return (
    <div
      id="LoginId"
      className="flex justify-center border mr-[25%] mb-[0%] mt-[5%] ml-[50%]  rounded-md shadow py-10"
    >
      <Field>
        <Label>User Name</Label>
        <Input
          ref={Refs.userNameRefId.ref}
          id="RegPage_userName"
          data-type="userName"
          placeholder="Please type here&hellip;"
          onChange={(e) => window.errorDisplay(setErrors, e, "userName")}
          onClick={(e) => window.errorOnClick(setErrors, e, "userName")}
          name="userName"
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}
        <Label>User Email Id</Label>
        <Input
          ref={Refs.EmailRefId.ref}
          id="RegPage_emailId"
          data-type="email"
          placeholder="Please type here&hellip;"
          onChange={(e) => window.errorDisplay(setErrors, e, "email")}
          onClick={(e) => window.errorOnClick(setErrors, e, "email")}
          name="email"
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Label>Mobile Number</Label>
        <Input
          ref={Refs.MobileRefId.ref}
          id="RegPage_mobNo"
          data-type="mobNo"
          placeholder="Please type here&hellip;"
          onChange={(e) => window.errorDisplay(setErrors, e, "mobNo")}
          onClick={(e) => window.errorOnClick(setErrors, e, "mobNo")}
          name="mobNo"
        />
        {errors.mobNo && <ErrorMessage>{errors.mobNo}</ErrorMessage>}
        <Label>Password</Label>
        <Input
          ref={Refs.PasswordRefId.ref}
          type="password"
          id="RegPage_password"
          data-type="loginPassword"
          placeholder="Please type here&hellip;"
          onChange={(e) => window.errorDisplay(setErrors, e, "password")}
          onClick={(e) => window.errorOnClick(setErrors, e, "password")}
          name="password"
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <div className="flex gap-2 mt-[5%]">
          <Button
            variant="secondary"
            size="login"
            className="gap-2"
            onClick={RegistrationCancel}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="login"
            className="gap-2"
            onClick={RegistrationCont}
          >
            Continue
          </Button>
        </div>
      </Field>
    </div>
  );
};

export default RegistrationPage;
