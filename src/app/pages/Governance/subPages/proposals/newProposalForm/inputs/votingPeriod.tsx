import { InputAdornment, TextField } from "@mui/material";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { isInvalidPeriod } from "app/pages/Governance/utils/period";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const VotingPeriodInput = () => {
  const fieldName = "votingPeriod";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const votingPeriod = useSelector(
    GovernanceSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }));
  };

  return (
    <TextField
      margin="dense"
      size="small"
      error={isInvalidPeriod(votingPeriod)}
      onChange={({ target }) => handleInputChange(target.value)}
      helperText={
        isInvalidPeriod(votingPeriod)
          ? t(translations.GovernancePage.VotingPeriodShouldBeBetween(), {
              min: env.MINIMUM_VOTING_PERIOD,
              max: env.MAXIMUM_VOTING_PERIOD,
              unit: env.MINIMUM_VOTING_PERIOD_UNIT,
            })
          : undefined
      }
      value={votingPeriod}
      fullWidth
      type="number"
      placeholder={t(translations.GovernancePage.PeriodInDaysToVote())}
      InputProps={{
        inputProps: {
          min: env.MINIMUM_VOTING_PERIOD,
          max: env.MAXIMUM_VOTING_PERIOD,
        },
        endAdornment: (
          <InputAdornment position="end">
            {env.MINIMUM_VOTING_PERIOD_UNIT}
          </InputAdornment>
        ),
      }}
      inputProps={{
        min: Number(env.MINIMUM_VOTING_PERIOD),
        max: Number(env.MAXIMUM_VOTING_PERIOD),
      }}
    />
  );
};
