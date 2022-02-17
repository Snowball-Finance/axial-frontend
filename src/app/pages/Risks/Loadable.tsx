/**
 *
 * Asynchronously loads the component for RisksPage
 *
 */
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/common/pageLoading';

export const RisksPage = lazyLoad(
  () => import('./index'),
  module => module.RisksPage,
  { fallback: <PageLoading /> },
);
