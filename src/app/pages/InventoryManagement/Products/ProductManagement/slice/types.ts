import { Pageable, Product } from 'types';
export interface ProductManagementState {
  products?: Pageable<Product> | null;
  productsByOwner?: Pageable<Product> | null;
  isLoading?: boolean;
}

export interface FilterParams {
  page: number;
  size: number;
}

export type SearchKeyType = 'TYPE' | 'UNIY';
