export declare function defineProvider<T extends () => any>(
  instance: T
): () => ReturnType<T>;
