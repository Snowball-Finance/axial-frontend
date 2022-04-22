import { styled, TextField } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { SectionTitle } from "app/pages/Governance/components/title";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { GovernancePageState } from "app/pages/Governance/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ExecutionList } from "./list";

export const Execution = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const canSubmitNewExecutionContext = useSelector(
    GovernancePageSelectors.canSubmitNewExecutionContext
  );
  const executionFields = useSelector(
    GovernancePageSelectors.currentExecutionContext
  );
  const { avaxValue, contractAddress, data, description } = executionFields;

  const handleInputChange = (
    key: keyof GovernancePageState["currentExecutionContext"],
    value: string
  ) => {
    dispatch(
      GovernancePageActions.setCurrentExecutionContextField({ key, value })
    );
  };
  const handleAddExecutionClick = () => {
    dispatch(
      GovernancePageActions.addToSubmittedExecutionContexts(executionFields)
    );
  };

  return (
    <>
      <Wrapper>
        <ExecutionList />
        <SectionTitle>
          {t(translations.GovernancePage.Execution())}
        </SectionTitle>
        <StyledTitle>
          {t(translations.GovernancePage.Description())}
        </StyledTitle>
        <StyledInput
          onChange={({ target }) =>
            handleInputChange("description", target.value)
          }
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          placeholder="A short description of execution context"
          value={description}
        />
        <StyledTitle>
          {t(translations.GovernancePage.ContractAddress())}
        </StyledTitle>
        <StyledInput
          onChange={({ target }) =>
            handleInputChange("contractAddress", target.value)
          }
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          placeholder="The addresses of the contracts for each execution"
          value={contractAddress}
        />
        <StyledTitle>{t(translations.GovernancePage.AVAXValue())}</StyledTitle>
        <StyledInput
          onChange={({ target }) =>
            handleInputChange("avaxValue", target.value)
          }
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          placeholder="The amount of AVAX to send each contract on execution"
          value={avaxValue}
        />
        <StyledTitle>{t(translations.GovernancePage.Data())}</StyledTitle>
        <StyledInput
          onChange={({ target }) => handleInputChange("data", target.value)}
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          placeholder="Encoded function parameters for each execution"
          value={data}
        />
        <ContainedButton
          onClick={handleAddExecutionClick}
          disabled={!canSubmitNewExecutionContext}
        >
          {t(translations.GovernancePage.AddExecution())}
        </ContainedButton>
      </Wrapper>
    </>
  );
};

const StyledInput = styled(TextField)({
  color: CssVariables.commonTextColor,
});

const StyledTitle = styled("p")({
  color: CssVariables.commonTextColor,
});
const Wrapper = styled(SnowPaper)({});
