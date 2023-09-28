export declare function defineService<Id extends string, SS>(
  id: Id,
  instance: () => SS
): () => ReturnType<() => SS>;

export declare function defineService<
  Id extends string,
  S extends Record<string | number | symbol, any> = {}
>(id: Id, instance: S): () => S;
