/**
 *
 * Asynchronously loads the component for PartnerDetails
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PartnerDetails = lazyLoad(
  () => import('./index'),
  module => module.PartnerDetails,
);
