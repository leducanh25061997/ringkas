import { VerificationStatusResponse } from '../../PreKprVerification/types';

/* --- STATE --- */
export interface ScoringReadyState {
  assessmentData?: AssessmentDataResponse;
  housePriceData?: HousePriceResponse;
  loading: boolean;
  kycStatus?: VerificationStatusResponse;
}

export interface RingkasRecommendationNotes {
  dbr?: string;
  housePriceSuggestion?: string;
  monthlyPaymentSuggestion?: string;
  note?: string;
}

export interface AssessmentDataResponse {
  recommendedBy: string;
  data: ScoringReadyRowData[];
  ringkasRecommendationNotes?: RingkasRecommendationNotes;
  ringkasRecommendation?: string;
}

export interface ScoringReadyRowData {
  ordinal: number;
  key: string;
  keyAsText: string;
  dataType: keyof typeof DataType;
  values: [string];
  dataSource: keyof typeof DataSource;
  children?: {
    ordinal: number;
    key: string;
    dataType: keyof typeof DataType;
    keyAsText: string;
    values: [string];
    dataSource: keyof typeof DataSource;
    // children: {
    //   ordinal: number;
    //   key: string;
    //   keyAsText: string;
    //   values: [string];
    //   dataSource: keyof typeof DataSource;
    // }[];
  }[];
}

export interface HousePriceResponse {
  bookingFee: number;
  discount: number;
  downPayment: number;
  housePrice: number;
  interestRate: number;
  tenorPreference: number;
}

export enum DataSource {
  'RINGKAS_DATABASE' = 'Ringkas Database',
  'OFFICIER_UPDATE' = 'Officer Update',
  'KPR_PREFERENCE' = 'KPR Preference',
  'THIRD_PARTY' = 'Third Party',
}

export enum DataType {
  'QUANTITATIVE' = 'Quantitative',
  'QUALITATIVE' = 'Qualitative',
}
