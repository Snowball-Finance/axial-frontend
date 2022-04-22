import { styled } from "@mui/material";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { SectionTitle } from "app/pages/Governance/components/title";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const ExecutionList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const submittedExecutionContexts = useSelector(
    GovernancePageSelectors.submittedExecutionContexts
  );
  if (submittedExecutionContexts.length === 0) {
    return <></>;
  }

  const handleEditClick = (index: number) => {
    dispatch(
      GovernancePageActions.setSubmittedExecutionContextForEditing({
        index,
      })
    );
  };
  const handleDeleteClick = (index: number) => {
    dispatch(
      GovernancePageActions.removeFromSubmittedExecutionContexts({
        index,
      })
    );
  };

  return (
    <Wrapper>
      <SectionTitle>
        {t(translations.GovernancePage.ExecutionList())}
      </SectionTitle>
      {submittedExecutionContexts.map(
        ({ description, contractAddress, avaxValue, data }, index) => {
          return (
            <StyledCard>
              <div>{description}</div>
              <div>{contractAddress}</div>
              <div>{avaxValue}</div>
              <div>{data}</div>
              <ButtonsWrapper>
                <ContainedButton onClick={() => handleEditClick(index)}>
                  {t(translations.GovernancePage.Edit())}
                </ContainedButton>
                <ContainedButton onClick={() => handleDeleteClick(index)}>
                  {t(translations.GovernancePage.Delete())}
                </ContainedButton>
              </ButtonsWrapper>
            </StyledCard>
          );
        }
      )}
    </Wrapper>
  );
};

const ButtonsWrapper = styled("div")({});

const StyledCard = styled("div")({
  border: "1px solid #e0e0e0",
  padding: "10px",
  marginBottom: "10px",
});

const Wrapper = styled("div")({});
