import {
  EditProductFormRequest,
  ProductInformation,
  ProductInformationResponse,
  ChangeStatus,
} from '../../app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import { ProjectManagement } from 'types/ProjectManagement';
import { Pageable, Product } from 'types';

import { axiosClient } from './axios';

const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (params[p] !== '' && !Array.isArray(params[p])) {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      } else if (Array.isArray(params[p]) && params[p].length) {
        params[p].map((item: any) => {
          str.push(encodeURIComponent(p) + '=' + item);
        });
      }
    }
  return str.join('&');
};

const fetchProjecsData = async (): Promise<Pageable<ProjectManagement>> => {
  const response = await axiosClient.get(`/console/projects`);
  return response.data.data;
};

const fetchProductData = async (
  params: string,
): Promise<ProductInformation> => {
  const response = await axiosClient.get(`/console/property/${params}`);
  return response.data;
};

const updateProduct = async (
  params?: ProductInformation,
): Promise<ProductInformationResponse> => {
  const response = await axiosClient.put(
    `/console/property/${params?.propertyId}`,
    params,
  );
  return response.data;
};

const fetchProductsData = async (params: any): Promise<Pageable<Product>> => {
  const response = await axiosClient.get(
    `/console/properties?${serialize(params)}`,
  );
  return response.data;
};

const fetchProductsDataByOwner = async (
  params: any,
): Promise<Pageable<Product>> => {
  const response = await axiosClient.get(
    `/console/properties/by-owner?${serialize(params)}`,
  );
  return response.data;
};

const createProductRequest = async (
  params: ProductInformation,
): Promise<ProductInformationResponse> => {
  const response = await axiosClient.post('/console/property', params);
  return response.data;
};

const updateProductStatus = async (
  params: ChangeStatus,
): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.productId;
  const response = await axiosClient.put(
    `/console/property/${params?.productId}/status`,
    newParams,
  );
  return response.data;
};

export default {
  fetchProductsDataByOwner,
  fetchProductsData,
  fetchProjecsData,
  fetchProductData,
  updateProduct,
  createProductRequest,
  updateProductStatus,
};
