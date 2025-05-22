import React, { useRef, useState } from "react";
import { Field, Label, Input, ErrorMessage, Button } from "shared-services";

const RegistrationPage = () => {
  const Refs = {
    userNameRefId: { ref: useRef(null), field: "userName" },
    EmailRefId: { ref: useRef(null), field: "email" },
    MobileRefId: { ref: useRef(null), field: "mobNo" },
  };
  const RegisterUser = async (req) => {
    const data = await window.ServerCall("createUserAPI", req);
    if(data.success){
      
    }
  };
  const [errors, setErrors] = useState({});
  const RegistrationCont = (e) => {
    if (!window.errorDisplayAll(Refs, setErrors)) {
      const req = {
        Name: "Sunil",
        MobileNumber: "9742720598",
        CIF: "1",
        UserName: "suni",
        EmailId: "SunilsnSunil28",
        Password: "Sunil@123",
        UserRole: "USER",
      };
      RegisterUser(req)
    }
  };
  const RegistrationCancel = (e) => {
    window.launchMicroApp("login", "LoginPage", "LoginId");
  };
  return (
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
  );
};

export default RegistrationPage;
