
import { Box, styled } from "@mui/material";
import { generateIconSrcByAddress } from "common/generateIconSrcByAddress";
import orderBasePair from "common/orderBasePair";

const Wrapper = styled('div')<any>(({ theme, size, flat }) => ({
  width: `${size || 50}px`,
  height: `${size || 50}px`,
  borderRadius: '50%',
  ...(!flat && { boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' })
  ,
  backgroundColor: 'white',
  padding: 1,
  '& img': {
    borderRadius: '50%',
    objectFit: 'contain',
  },
  '&.secondTokenIcon': {
    marginLeft: theme.spacing(-2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(-1),
    }
  },

}));

export const SnowPairsIcon = ({ addresses, size, flat }: { addresses: string[], size?: number, flat?: boolean }) => {
  let pairsIcon = orderBasePair(addresses.filter(address => address !== ''));
  return (
    <Box display='flex'>{pairsIcon.map((pair, index) => {
      if (pair) {
        const src = generateIconSrcByAddress(pair);
        return (
          <Wrapper key={index} size={size} flat={flat} className={`${index > 0 ? 'secondTokenIcon' : ''}`}>
            <img
              alt="token"
              src={src}
              width={size || 50}
              height={size || 50}
            />
          </Wrapper>
        );
      }
      return null;
    })}
    </Box>
  );
};

