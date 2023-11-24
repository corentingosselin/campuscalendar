export interface LoadingState {
  loading: boolean;
  errorMessage?: string;
}

export interface HttpError {
  message: string;
  status: number;
}
