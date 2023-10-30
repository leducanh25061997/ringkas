/**
 *
 * Asynchronously loads the component for RegisterNewClient
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RegisterNewClient = lazyLoad(
  () => import('./index'),
  module => module.RegisterNewClient,
);
