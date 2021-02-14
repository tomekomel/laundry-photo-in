export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  next?: number;
  previous?: number;
}
