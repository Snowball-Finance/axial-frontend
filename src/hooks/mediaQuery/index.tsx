import { useMediaQuery } from "@mui/material";

export const sizes = {
  small: 900,
  medium: 1024,
  large: 1440,
  xlarge: 1920,
};

export const mobileQuery = `(max-width: ${sizes.small}px)`;

export const useDeviceSize = () => {
  const isMobile = useMediaQuery(mobileQuery);
  return {
    isMobile,
  };
};
