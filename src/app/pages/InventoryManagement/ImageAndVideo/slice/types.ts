import { Pageable } from '../../../../../types';

export interface MediaListPayload {
  name: string;
  mimeType: string;
  size: number;
  location?: string;
}

export interface MediaDataItem {
  id: number;
  location: string;
  mimeType: string;
  size: number;
  source: string;
  status: string;
  name: string;
}

export interface MediaParams {
  size?: number;
  page?: number;
  orders?: string[];
}

export interface MediaState {
  isLoading?: boolean;
  mediaFetchList?: Pageable<MediaDataItem>;
}
