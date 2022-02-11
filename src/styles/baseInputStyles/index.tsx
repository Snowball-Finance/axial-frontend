import { Theme } from "@mui/material/styles";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const BaseInputStyles = ({ theme }: { theme: Theme }) => {
  return {
    borderRadius: 10,
    position: "relative",
    backgroundColor: CssVariables.paperBackground,
    border: "1px solid transparent",
    boxShadow: "none",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  };
};
