import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public itemOnPage: number;
  public total: number;
  public next: number;
  public previous: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.itemOnPage = paginationResults.results.length;
    this.total = paginationResults.total;
    this.next = paginationResults.next;
    this.previous = paginationResults.previous;
  }
}
