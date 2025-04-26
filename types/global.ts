export type ActionResponse = {
  status: string | number;
  message: string;
};

export type ActionResponseWithData<DATA> = {
  status: string | number;
  message: string;
  data: DATA | null;
};
