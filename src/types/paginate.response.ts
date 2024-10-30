export interface PaginateResponse<T> {
  readonly data: T[];
  readonly lastPage: number;
  readonly total: number;
}
