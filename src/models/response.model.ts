export interface ResponseModel<T> {
  success: boolean;
  data: T;
}

export const emptySuccessResponse = <T>(): ResponseModel<T> => {
  return {
    success: true,
    data: undefined,
  };
};

export function empyResponse<T>(): ResponseModel<T> {
  return {
    success: true,
    data: undefined,
  };
}

export function Response<T>(data: T): ResponseModel<T> {
  return {
    success: true,
    data: data,
  };
}

export const successResponse = <T>(data: T): ResponseModel<T> => {
  return {
    success: true,
    data: data,
  };
};
