import { styled, TextField } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { SectionTitle } from "app/pages/Governance/components/title";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { ExecutionContext, GovernancePageState } from "app/pages/Governance/types";
import { env } from "environment";
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

  const handleAdd2Examples=()=>{
    const t1='0xa9059cbb000000000000000000000000c99ee029ebaeaf473ef69aef6633489d9ae533850000000000000000000000000000000000000000000000000000000000000001'
    const t2='0xa9059cbb000000000000000000000000c99ee029ebaeaf473ef69aef6633489d9ae533850000000000000000000000000000000000000000000000000000000000000004'
    const examples:ExecutionContext[]=[
      {
        avaxValue:'0',
        contractAddress:env.MAIN_TOKEN_ADDRESS||'',
        data:t1,
        description:'send some money to  0xC99Ee029ebaeaf473eF69Aef6633489d9aE53385'
      },
      {
        avaxValue:'0',
        contractAddress:env.MAIN_TOKEN_ADDRESS||'',
        data:t2,
        description:'send more money to  0xC99Ee029ebaeaf473eF69Aef6633489d9aE53385'
      }
    ]
    dispatch(GovernancePageActions.setExecutionContextArray(examples))

  }

  return (
    <>
      <Wrapper>
        <ExecutionList />
        <ContainedButton onClick={handleAdd2Examples}>
          add 2 examples
        </ContainedButton>
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
