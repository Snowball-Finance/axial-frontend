import React, { ReactElement } from "react";
import { styled } from "@mui/material";

import { socialLinks } from "../constants";

export default function SocialLink(): ReactElement {
  return (
    <StyledSocial>
      {socialLinks.map((linkItem, index) => (
        <SocialItem
          key={index}
          href={linkItem.href}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={linkItem.iconUrl} alt={linkItem.icon} />
        </SocialItem>
      ))}
    </StyledSocial>
  );
}

const StyledSocial = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 60,
});

const SocialItem = styled("a")({
  padding: "0px 8px",

  "&:hover": {
    transform: "scale(1.05)",
  },
});

const Image = styled("img")({});
