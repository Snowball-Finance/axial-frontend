/**
 *
 * Asynchronously loads the component for SwapPage
 *
 */
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/common/pageLoading';

export const SwapPage = lazyLoad(
  () => import('./index'),
  module => module.SwapPage,
  { fallback: <PageLoading /> },
);
