import React, { useRef, useState } from "react";
import { Field, Label, Input, ErrorMessage, Button } from "shared-services";
const RegistrationPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const Refs = {
    userNameRefId: { ref: useRef(null), field: "userName" },
    EmailRefId: { ref: useRef(null), field: "email" },
    MobileRefId: { ref: useRef(null), field: "mobNo" },
    PasswordRefId: { ref: useRef(null), field: "password" },
    ProfilePicRefId: { ref: useRef(null), field: "profilePIC" },
    CIFNumberRefId: { ref: useRef(null), field: "CIFNumber" },
  };
  window.setShowSideBar(false);
  const [errors, setErrors] = useState({});
  const RegisterUser = async (req) => {
    const data = await window.ServerCall("createUserAPI", req);
    console.log(data);
    if (data.success) {
      window.showAlert({
        AlertType: "S",
        AlertDesc: data.message,
        Btns: [
          {
            Name: "Ok",
            function: () =>
              window.launchMicroApp("login", "LoginPage", "BaseScreenID"),
          },
        ],
      });
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
        CIF: Refs["CIFNumberRefId"].ref.current.value,
        Password: Refs["PasswordRefId"].ref.current.value,
        UserRole: "USER",
        ProfilePic: profilePic,
      };
      RegisterUser(req);
    }
  };
  const RegistrationCancel = (e) => {
    window.launchMicroApp("login", "LoginPage", "BaseScreenID");
  };
  return (
    <div
      id="RegistrationID"
      className=" border mr-[25%] mb-[0%] mt-[5%] ml-[25%]  rounded-md shadow bg-white"
    >
      <div className="flex justify-center p-4">
        {" "}
        <span className="text-xl text-gray-700 font-bold uppercase">
          User Registration
        </span>
      </div>
      <div className="flex justify-center p-4 gap-4">
        <div className="w-[50%] p-4">
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
          </Field>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </div>
        <div className="w-[50%] p-4">
          <Field>
            <Label>Profile Pic</Label>
            <Input
              ref={Refs.ProfilePicRefId.ref}
              type="file"
              id="RegPage_profilePic"
              data-type="profilePIC"
              accept="image/*"
              placeholder="Please type here&hellip;"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfilePic(reader.result); // ✅ base64 string
                  };
                  reader.readAsDataURL(file); // 🔁 converts to base64
                }
                window.errorDisplay(setErrors, e, "profilePIC");
              }}
              onClick={(e) => window.errorOnClick(setErrors, e, "profilePIC")}
              name="profilePIC"
            />
            {errors.profilePIC && (
              <ErrorMessage>{errors.profilePIC}</ErrorMessage>
            )}
            <Label>CIF Number</Label>
            <Input
              ref={Refs.CIFNumberRefId.ref}
              id="RegPage_CIFNumber"
              data-type="CIFNumber"
              type="number"
              placeholder="Please type 10 Digit CIF Number&hellip;"
              onChange={(e) => window.errorDisplay(setErrors, e, "CIFNumber")}
              onClick={(e) => window.errorOnClick(setErrors, e, "CIFNumber")}
              name="CIFNumber"
            />
            {errors.CIFNumber && (
              <ErrorMessage>{errors.CIFNumber}</ErrorMessage>
            )}
          </Field>
        </div>
      </div>
      <div className="flex gap-4 justify-center p-4 ">
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
    </div>
  );
};

export default RegistrationPage;
