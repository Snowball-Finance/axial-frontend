import { CircularProgress, styled } from "@mui/material";

export const SnowCircularProgressInModal = () => {
  return (
    <Wrapper>
      <CircularProgress color="primary" size={"1.25rem"} />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  paddingLeft: "2px",
});
