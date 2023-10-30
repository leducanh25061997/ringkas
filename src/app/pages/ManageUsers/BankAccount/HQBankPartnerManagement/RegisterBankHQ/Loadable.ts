/**
 *
 * Asynchronously loads the component for RegisterNewBankHQ
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RegisterNewBankHQ = lazyLoad(
  () => import('./index'),
  module => module.RegisterNewBankHQ,
);
