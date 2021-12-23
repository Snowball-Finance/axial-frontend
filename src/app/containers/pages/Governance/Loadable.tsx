/**
*
* Asynchronously loads the component for Governance
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/common/pageLoading';

export const Governance = lazyLoad(() => import('./index'), module => module.Governance, {fallback: <PageLoading />,},);