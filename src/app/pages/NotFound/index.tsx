import { styled } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <p>Page not found.</p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled("div")`
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled("div")`
  margin-top: -8vh;
  font-weight: bold;
  color: grey;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
