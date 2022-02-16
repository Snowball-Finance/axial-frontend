/**
 * Asynchronously loads the component for NotFoundPage
 */

import { PageLoading } from "app/components/common/pageLoading";
import { lazyLoad } from "common/loadable";

export const NotFoundPage = lazyLoad(
  () => import("./index"),
  (module) => module.NotFoundPage,
  {
    fallback: <PageLoading />,
  }
);
