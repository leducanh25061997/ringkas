/**
 *
 * Asynchronously loads the component for CustomerInfomation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HQBankAccountEdit = lazyLoad(
  () => import('./index'),
  module => module.default,
);
