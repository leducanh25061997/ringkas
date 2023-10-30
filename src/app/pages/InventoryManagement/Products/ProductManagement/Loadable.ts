/**
 *
 * Asynchronously loads the component for CustomerInfomation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ProductManagement = lazyLoad(
  () => import('./index'),
  module => module.default,
);
