export interface QueryParam {
  [key: string]: string | undefined;
}

export interface Error {
  status?: number;
  message?: string;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
