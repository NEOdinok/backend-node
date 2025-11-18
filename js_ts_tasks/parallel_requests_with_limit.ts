/**
 * Implement the function that will execute a callback with the data
 * and return an array of responses Response[].
 * The solution should execute all requests in parallel
 * but no more than [limit] requests can be executed concurrently.
 * The goal is to minimize the total execution time.
 */

type Props<RequestData, Response> = {
  callback: (args: RequestData) => Promise<Response>; // складывает на сервер
  data: Array<RequestData>; // массив файлов
  limit: number;
};

/** Решение задачи */
export function runWithLimit<RequestData, Response>({
  callback,
  data,
  limit,
}: Props<RequestData, Response>): Promise<Response[]> {
  const result: Response[] = [];

  return Promise.resolve([]);
}
