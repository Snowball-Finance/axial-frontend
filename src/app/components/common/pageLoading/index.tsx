import React from 'react';
import { Wrapper } from './wrapper';

const PageLoading = props => {
  return (
    <Wrapper {...props}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};
export { PageLoading };
