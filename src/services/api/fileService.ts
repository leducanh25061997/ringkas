import { FileUpload, Pageable, ParamsUrl } from 'types';
import queryString from 'query-string';

import axios, { CancelTokenSource } from 'axios';

import { createService } from './axios';
import {
  MediaListPayload,
  MediaParams,
  MediaDataItem,
} from '../../app/pages/InventoryManagement/ImageAndVideo/slice/types';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const fetchUrlImages = async (params: any): Promise<FileUpload[]> => {
  try {
    const response = await instance.get(
      `/storage/s3/file/upload-url?${queryString.stringify(params)}`,
    );
    return response.data;
  } catch (e) {
    throw Error(`Something wrong: ${e}`);
  }
};

const getUrlImageData = async (
  params: ParamsUrl[],
  cancelTokenSource?: CancelTokenSource,
  onUploadProgress?: (event: any) => void,
  headers?: string,
): Promise<ParamsUrl[]> => {
  const client = axios.create();
  const responUrl: ParamsUrl[] = [];
  await Promise.all(
    params.map((value, index) => {
      return new Promise((resolve, reject) => {
        client
          .put(value.url, value.files, {
            headers: {
              'Content-Type': value.files.type,
            },
            cancelToken: cancelTokenSource && cancelTokenSource.token,
            onUploadProgress,
          })
          .then(resp => {
            responUrl.push({
              name: value.name,
              url: String(resp?.config?.url),
              originalName: value.originalName,
              s3Key: value.key,
            });
            resolve(resp);
          })
          .catch(err => reject(err));
      });
    }),
  );
  return responUrl;
};

const downloadUrlImageData = async (
  params: ParamsUrl[],
  cancelTokenSource?: CancelTokenSource,
  onUploadProgress?: (event: any) => void,
  headers?: string,
): Promise<ParamsUrl[]> => {
  const client = axios.create();
  const responUrl: ParamsUrl[] = [];
  await Promise.all(
    params.map((value, index) => {
      return new Promise((resolve, reject) => {
        client
          .put(value.url, value.files, {
            headers: {
              'Content-Disposition': `attachment; filename=${encodeURI(
                value.files.name || 'unknow',
              )}`,
            },
            cancelToken: cancelTokenSource && cancelTokenSource.token,
            onUploadProgress,
          })
          .then(resp => {
            responUrl.push({
              name: value.name,
              url: String(resp?.config?.url),
              originalName: value.originalName,
              s3Key: value.key,
            });
            resolve(resp);
          })
          .catch(err => reject(err));
      });
    }),
  );
  return responUrl;
};

const createMedia = async (
  body: MediaListPayload[],
): Promise<MediaDataItem[]> => {
  try {
    const response = await instance.post(`/storage/files`, body);
    return response.data;
  } catch (e) {
    throw Error(`Something wrong: ${e}`);
  }
};

const fetchMedia = async (
  params?: MediaParams,
): Promise<Pageable<MediaDataItem>> => {
  try {
    const response = await instance.get(`/storage/files`, { params });
    return response.data;
  } catch (e) {
    throw Error(`Something wrong: ${e}`);
  }
};

const deleteMedia = async (fileId: string) => {
  try {
    const response = await instance.delete(`/storage/file/${fileId}`);
    return response.data;
  } catch (e) {
    throw Error(`Something wrong: ${e}`);
  }
};

export default {
  fetchUrlImages,
  getUrlImageData,
  createMedia,
  fetchMedia,
  deleteMedia,
  downloadUrlImageData,
};
