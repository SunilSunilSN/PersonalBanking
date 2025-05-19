import React, { useRef, useState } from "react";
import { Field, Label, Input, ErrorMessage, Button } from "shared-services";

const RegistrationPage = () => {
  const customerIdRef = useRef(null);
  const [errors, setErrors] = useState({});

  return (
    <Field>
      <Label>Customer ID</Label>
      <Input
        ref={customerIdRef}
        id="RegPage_custId"
        data-type="custId"
        placeholder="Please type here&hellip;"
        onChange={(e) => window.errorDisplay(setErrors, e, "custId")}
        name="custId"
      />
      {errors.custId && <ErrorMessage>{errors.custId}</ErrorMessage>}
    </Field>
  );
};

export default RegistrationPage;
