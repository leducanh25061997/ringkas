/**
 *
 * Asynchronously loads the component for RegisterNewClient
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RegisterNewDeveloper = lazyLoad(
  () => import('./index'),
  module => module.RegisterNewDeveloper,
);
