import { SnowModal } from "app/components/common/modal";
import { WithdrawModal } from "app/pages/Liquidity/components/modal/Withdraw";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { useSelector } from "react-redux";

export const WithdrawConfirmation = () => {
  const data = useSelector(LiquidityPageSelectors.withdrawConfirmationData);
  return (
    <SnowModal isOpen={data !== undefined}>
      <WithdrawModal />
    </SnowModal>
  );
};
