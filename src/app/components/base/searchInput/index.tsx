import React from "react";
import { styled } from "@mui/material";
import { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface SearchInputInterface {
  onChange: (v: string) => void;
  value?: string;
  placeHolder?: string;
  onClearClick?: () => void;
}
const Wrapper = styled("div")({
  position: "relative",
  minHeight: "45px",
});

const Input = styled("input")({
  background: "transparent",
  border: "none",
  width: "100%",
  height: "45px",
  outline: "none",
  padding: "0px 12px",
  color: CssVariables.white,
  fontSize: "16px",
});
const EndIconWrapper = styled("div")({
  position: "absolute",
  right: "10px",
  top: "4px",
});

const SIcon = () => {
  return (
    <IconButton
      color="primary"
      aria-label="clear search"
      disabled
      component="span"
    >
      <SearchIcon />
    </IconButton>
  );
};
const CIcon = ({ onClear }: { onClear: () => void }) => {
  return (
    <IconButton
      color="primary"
      aria-label="clear search"
      onClick={onClear}
      component="span"
    >
      <CloseIcon />
    </IconButton>
  );
};

export const SearchInput = ({
  onChange,
  value = "",
  onClearClick,
  placeHolder,
}: SearchInputInterface) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Wrapper>
      <Input
        onChange={handleInputChange}
        value={value}
        placeholder={placeHolder}
      />
      {
        <EndIconWrapper>
          {onClearClick ? (
            value ? (
              <CIcon onClear={onClearClick} />
            ) : (
              <SIcon />
            )
          ) : (
            <SIcon />
          )}
        </EndIconWrapper>
      }
    </Wrapper>
  );
};
