import React, { useRef, useState } from "react";
import { Field, Label, Input, ErrorMessage, Button } from "shared-services";
import { PlusIcon } from "@heroicons/react/16/solid";
const LoginPage = () => {
  const Refs = {
    userNameRefId: { ref: useRef(null), field: "userName" },
    passwordRef: { ref: useRef(null), field: "password" },
  };
  window.setShowSideBar(false);
  const [errors, setErrors] = useState({});
  const btnRef = useRef(null);
  const LoginCall = async (req) => {
    const data = await window.ServerCall("loginUserAPI", req);
    if (data.success) {
      
      window.launchMicroApp("login", "DashboardPage", "BaseScreenID");
    } else {
      window.showAlert({
        AlertType: "E",
        AlertDesc: data.message,
        Btns: [
          {
            Name: "Ok",
            function: () =>
              window.launchMicroApp("login", "LoginPage", "BaseScreenID"),
          },
        ],
      });
    }
  };
  const LoginSubmit = (e) => {
    // if (!window.errorDisplayAll(Refs, setErrors)) {
    //   const LoginReq = {
    //     UserName: Refs["userNameRefId"].ref.current.value,
    //     Password: Refs["passwordRef"].ref.current.value,
    //   };
    //   LoginCall(LoginReq);
    // }
    window.launchMicroApp("login", "DashboardPage", "BaseScreenID");
  };
  return (
    <div
      id="LoginId"
      className="flex justify-center border mr-[25%] mb-[0%] mt-[5%] ml-[50%] rounded-md shadow py-10 px-10"
    >
      <Field>
        <Label>User Name</Label>
        <Input
          ref={Refs.userNameRefId.ref}
          id="LoginPage_userName"
          data-type="userName"
          placeholder="Please type here&hellip;"
          onChange={(e) => window.errorDisplay(setErrors, e, "userName")}
          onClick={(e) => window.errorOnClick(setErrors, e, "userName")}
          name="userName"
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}
        <Label>Password</Label>
        <Input
          ref={Refs.passwordRef.ref}
          id="LoginPage_password"
          type="password"
          data-type="loginPassword"
          placeholder="Please type here&hellip;"
          name="password"
          onChange={(e) => window.errorDisplay(setErrors, e, "password")}
          onClick={(e) => window.errorOnClick(setErrors, e, "password")}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <div className="flex gap-2 mt-[5%]">
          <Button
            variant="secondary"
            size="login"
            className="gap-2"
            onClick={LoginSubmit}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            ref={btnRef}
            size="login"
            className="gap-2"
            onClick={(e) =>
              window.launchMicroApp("login", "RegistrationPage", "BaseScreenID")
            }
          >
            <PlusIcon className="h-4 w-4"></PlusIcon>
            Register
          </Button>
        </div>
      </Field>
    </div>
  );
};

export default LoginPage;
