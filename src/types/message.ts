export type MessageTypes<T> = keyof T;

export interface BaseMessage<T extends MessageTypes<any>, D> {
  type: T;
  data: D;
}

export type WebViewMessage<T> = {
  [K in MessageTypes<T>]: BaseMessage<K, T[K]>;
}[MessageTypes<T>];
