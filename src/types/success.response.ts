export interface SuccessResponse<T> {
  isSuccess: boolean;
  message: string;
  timestamp: string;
  result: T;
}
