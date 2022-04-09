import { ContainedButton } from "app/components/common/buttons/containedButton";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { StakingSubPages } from "../../routes";

export const StakingRoot = () => {
  const dispatch = useDispatch();

  const goToSAxial = () => {
    dispatch(push(StakingSubPages.sAxial));
  };

  const goToVeAxial = () => {
    dispatch(push(StakingSubPages.veAxial));
  };

  return (
    <>
      <ContainedButton onClick={goToSAxial}>sAxial</ContainedButton>
      <ContainedButton onClick={goToVeAxial}>veAxial</ContainedButton>
    </>
  );
};
