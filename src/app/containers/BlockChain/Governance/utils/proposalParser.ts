// import { BigNumber, ethers } from "ethers";
// import { Proposal } from "../types";
// import axios from "axios";

export const parseProposalFromRawBlockchainResponse = async ({
  item,
  alreadyHasMetadata,
}: {
  alreadyHasMetadata?: boolean;
  item: any;
}) => {
  // const parsed: Partial<Proposal> = {};
  // parsed.title = item["title"];
  // let forVotes = BigNumber.from(item["forVotes"].toString());
  // parsed.forVotes = Number(ethers.utils.formatUnits(forVotes, 18).toString());
  // let againstVotes = BigNumber.from(item["againstVotes"].toString());
  // parsed.againstVotes = Number(
  //   ethers.utils.formatUnits(againstVotes, 18).toString()
  // );
  // parsed.proposer = item["proposer"];
  // const startTime = Number(item["startTime"].toString());
  // if (!alreadyHasMetadata) {
  //   let meta;
  //   try {
  //     meta = await axios.request({
  //       url: item["metadata"],
  //       method: "GET",
  //     });
  //   } catch (error) {
  //     console.debug(error);
  //   }
  //   if (meta) {
  //     parsed.metadata = meta.data;
  //   }
  // }
  // const endTime = Number(
  //   item["startTime"].add(item["votingPeriod"]).toString()
  // );
  // //convert statrtTime to timestamp
  // parsed.startDate = new Date(startTime * 1000).toISOString();
  // //convert endTime to timestamp
  // parsed.endDate = new Date(endTime * 1000).toISOString();
  // return parsed;
  return item;
};
