/* eslint-disable max-len */
interface ISuccessResponse<T> {
  data: T;
  error: null;
}
interface IErrorResponse {
  data: null;
  error: any;
}
/**
 * Represents the result of an API call, encapsulating either a successful response or an error.
 *
 * Use this type to handle both success and error cases in a unified way.
 *
 * @template T - The type of the successful response data.
 *
 * @example
 * someApiCall(): Promise<Result<MyDataType>> {
 *  try {
 *   const response: AxiosResponse<MyDataType> = await api.get('/endpoint');
 *   return { data: response.data, error: null };
 *  } catch (error) {
 *   return { data: null, error };
 *  }
 *
 * const result = await someApiCall();
 * // Usage:
 * if (result.error) {
 *   // Handle error
 * } else {
 *   // Access result.data
 * }
 */
export type Result<T> = ISuccessResponse<T> | IErrorResponse;
