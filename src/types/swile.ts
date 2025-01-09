export type SwileOperation = {
  date: string;
  amount: { value: number };
};

export type SwileFetchOperationsQueryParams = {
  before?: string;
  per?: number;
};

export type SwileFetchOperationsOkResponse = {
  has_more: boolean;
  items: Array<SwileOperation>;
};
