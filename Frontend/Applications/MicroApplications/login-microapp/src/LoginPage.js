import React, { useRef, useState } from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "shared-services";
import { Field, Label, Input, ErrorMessage, Button } from "shared-services";
import { PlusIcon } from "@heroicons/react/16/solid";
const LoginPage = ({ userId, theme }) => {
  const Refs = {
    emailRef: { ref: useRef(null), field: "email" },
    passwordRef: { ref: useRef(null), field: "password" },
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LoginSubmit = (e) => {
    if (window.errorDisplayAll(Refs, setErrors)) {
      console.log("submit");
    }
  };
  const RegistrationNav = (e) => {
    window.launchMicroApp("login", "RegistrationPage", "LoginId");
  };
  return (
    <Field>
      <Label>Email</Label>
      <Input
        ref={Refs.emailRef.ref}
        id="LoginPage_email"
        type="email"
        data-type="email"
        placeholder="Please type here&hellip;"
        onChange={(e) => window.errorDisplay(setErrors, e, "email")}
        onClick={(e) => window.errorOnClick(setErrors,e, "email")}
        name="email"
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Label>Password</Label>
      <Input
        ref={Refs.passwordRef.ref}
        id="LoginPage_password"
        type="password"
        data-type="loginPassword"
        placeholder="Please type here&hellip;"
        name="password"
        onChange={(e) => window.errorDisplay(setErrors, e, "password")}
        onClick={(e) => window.errorOnClick(setErrors,e, "password")}
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
          size="login"
          className="gap-2"
          onClick={RegistrationNav}
        >
          <PlusIcon className="h-4 w-4"></PlusIcon>
          Register
        </Button>
      </div>
    </Field>
  );
};

export default LoginPage;
