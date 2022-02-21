import React from "react";
import { styled, TextField } from "@mui/material";
import { ChangeEvent } from "react";

import { InputInterface } from "./types";

const Input = styled(TextField)({
  background: "transparent",
  border: "none",
  outline: "none",
});

export const SnowInput = ({
  onChange,
  value = "",
  placeHolder,
  ...rest
}: InputInterface) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      onChange={handleInputChange}
      value={value}
      placeholder={placeHolder}
      {...rest}
    />
  );
};
