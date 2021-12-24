import { styled, Tab, Tabs } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface Page{
    path: string;
    title: string;
}
interface NavigationTabsProps {
  activePage: string;
  onTabChange: (page: string) => void;
  pages: Page[]
}
/**
 * 
 * active page should be one of the "page.path"s in the pages array
 */
export const NavigationTabs:FC<NavigationTabsProps>=({activePage,pages,onTabChange})=>{

  return (
  <Wrapper>
      <Tabs
        value={activePage}
        onChange={(_,path)=>onTabChange(path)}
        indicatorColor='primary'
        textColor='primary'
      >
        {pages.map((item: Page, index: number) => {
          return (
            <Tab
              disableRipple={true}
              className={`${index === 0 ? 'first' : ''} ${
                index ===pages.length - 1 ? 'last' : ''
              }  `}
              value={item.path}
              key={'segment' + index}
              label={
                <>
                  <span>{item.title}</span>
                </>
              }
            />
          );
        })}
      </Tabs>
  </Wrapper>
  )
}



const Wrapper=styled(SnowPaper)({
  width:'fit-content',
  padding:'4px 6px',
  margin:'auto',
  ".MuiTabs-indicator":{
    height: '36px',
    background: CssVariables.activeNAvigationTabBackground,
    borderRadius: '8px',
    bottom:'5px',
  },
  '.MuiButtonBase-root':{
    zIndex: '1',
  },
  "span":{
    textTransform: 'none',
    color:CssVariables.navigationTabTextColor
  }
})