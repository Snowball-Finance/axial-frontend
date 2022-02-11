import { styled } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import CrossIcon from "assets/images/iconComponents/cross";
import { translations } from "locales/i18n";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { LeftSection } from "./left";
import { RightSection } from "./right";

export const NewProposalForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isOpen = useSelector(GovernanceSelectors.selectIsNewProposalFormOpen);
  const ref = useRef<any>(null);

  const handleCloseClick = () => {
    dispatch(GovernanceActions.setIsNewProposalFormOpen(false));
  };

  return (
    <Wrapper ref={ref} isopen={isOpen ? "true" : ""}>
      <Zoom in={isOpen} style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}>
        <ContentWrapper>
          <CloseWrapper onClick={handleCloseClick}>
            <CrossIcon color={CssVariables.darkText} />
          </CloseWrapper>
          <Title>{t(translations.GovernancePage.NewProposal())}</Title>
          <ProposalBodyWrapper>
            <LeftSection />
            <RightSection />
          </ProposalBodyWrapper>
        </ContentWrapper>
      </Zoom>
    </Wrapper>
  );
};

const Title = styled("p")({
  fontSize: "20px",
  fontWeight: "500",
  margin: 0,
  color: CssVariables.black,
  marginBottom: "24px",
});

const ProposalBodyWrapper = styled("div")({
  width: "100%",
  display: "flex",
  gap: "16px",
  [mobile]: {
    flexDirection: "column-reverse",
  },
});

const CloseWrapper = styled("div")({
  position: "absolute",
  top: 12,
  right: 12,
  cursor: "pointer",
});

const ContentWrapper = styled("div")({
  width: "102%",
  marginLeft: "-1%",
  height: "100%",
  padding: "24px 44px",
  backdropFilter: "blur(20px)",
  borderRadius: CssVariables.paperBorderRadius,
  [mobile]: {
    height: "100vh",
    overflow: "auto",
  },
});

const Wrapper = styled("div")<{ isopen: "true" | "" }>(({ isopen }) => ({
  position: isopen ? "sticky" : "absolute",
  top: 0,
  zIndex: 2,
  pointerEvents: isopen ? "auto" : "none",
  opacity: isopen ? 1 : 0,
  transition: "opacity 0.3s ease-in-out",
  width: "100%",
  height: "100vh",
  marginBottom: "-100vh",
}));
