import { FC } from "react"

interface ProposalsProps {
  filter: 'all' | 'active'
}
export const Proposals: FC<ProposalsProps> = ({filter}) => {
  return <>{`proposals ${filter}`}</>
}