export interface IPaginateedResponse<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: T;
  items: number;
  last: number;
}
