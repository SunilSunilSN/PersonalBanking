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
    window.setLoader(true);
    await window.WorkFlowCall(
      "OTPAUTHANDLOGIN",
      "VERFIUSER",
      req,
      workFlowCallBack
    );
    //localStorage.setItem("userDetails", JSON.stringify(data));
    //window.launchMicroApp("login", "DashboardPage", "BaseScreenID");
  };
  const workFlowCallBack = (params) => {
    console.log(params);
    const data = params;
    if (params.success) {
      if (params.Step === "VERFIUSER") {
        window.WorkFlowCall(
          "OTPAUTHANDLOGIN",
          "GENERATEOTP",
          data.data,
          workFlowCallBack
        );
      } else if (params.Step === "GENERATEOTP") {
        window.AuthFunctions({
          onSuccessFn: onLoginAuthSuccess,
          onCancelFn: onLoginAuthCancel,
          onFailureFn: onLoginAuthFailure,
          action: "SET",
        });
        setTimeout(() => {
window.launchMicroApp("auth", "OTPAuthPage", "AuthModalId", data.data);
    }, 1000);
        
      }
    } else {
      window.showAlert({
        AlertType: "E",
        AlertDesc: data.message,
        Btns: [
          {
            Name: "Ok",
            function: () => {
              window.setModalData((prev) => ({ ...prev, isOpen: false }));
              window.launchMicroApp("login", "LoginPage", "BaseScreenID");
            },
          },
        ],
      });
    }
  };
  const onLoginAuthSuccess = async (params) => {
    console.log(params);
    const data = await window.ServerCall("loginUserAPI", params.data);
    window.setModalData((prev) => ({ ...prev, isOpen: false }));
    if (data.success) {
      localStorage.setItem("userDetails", JSON.stringify(data));
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
  const onLoginAuthCancel = (params) => {
    window.launchMicroApp("login", "LoginPage", "BaseScreenID");
  };
  const onLoginAuthFailure = (params) => {
    if (!params.success) {
      window.showAlert({
        AlertType: "E",
        AlertDesc: params.message,
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
    if (!window.errorDisplayAll(Refs, setErrors)) {
      const LoginReq = {
        UserName: Refs["userNameRefId"].ref.current.value,
        Password: Refs["passwordRef"].ref.current.value,
      };
      LoginCall(LoginReq);
      //LoginCall("LoginReq");
    }
    //window.launchMicroApp("login", "DashboardPage", "BaseScreenID");
  };
  return (
    <div
      id="LoginId"
      className=" border mr-[35%] mb-[0%] mt-[5%] ml-[35%] rounded-md shadow bg-white"
    >
      <div className="flex justify-center p-4">
        {" "}
        <span className="text-xl text-gray-700 font-bold uppercase">
          Login Page
        </span>
      </div>
      
      <div className="flex justify-center p-4 gap-4">
        <div className=" w-full p-4">
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
        </Field>
      </div>
      </div>

      <div className="flex gap-4 justify-center p-4 ">
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
    </div>
  );
};

export default LoginPage;
