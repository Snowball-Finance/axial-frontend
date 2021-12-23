import { replace } from "connected-react-router";
import { FC } from "react";
import { useDispatch } from "react-redux";

interface TabsProps {
  activePage: string;
  pages: {
    path: string;
    title: string;
  }[]
}
export const Tabs:FC<TabsProps>=()=>{
  const handleTabChange = (page: string) => {
    dispatch(replace(page))
  }
  const dispatch=useDispatch()
  
  return <></>
}