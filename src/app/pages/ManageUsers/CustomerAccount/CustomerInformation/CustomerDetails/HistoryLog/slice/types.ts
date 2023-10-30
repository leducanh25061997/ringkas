export interface HistoryLogsParams {
  size?: number;
  page?: number;
  orders?: string;
  eventDateFrom?: number;
  eventDateTo?: number;
  objectUuid?: string;
}

export interface HistoryLogsResponse {
  objectUuid: string;
  objectName: string;
  subjectUuid: string;
  subjectName: string;
  eventAction: string;
  eventName: string;
  eventDate: number;
}

export interface HistoryLogsState {
  isLoading?: boolean;
  historyLogs?: HistoryLogsResponse[];
  historyLogsByTime?: HistoryLogsResponse[];
}
