import { memoizeWith, identity, isNil } from "ramda";

export const defineProvider = (id, instance) => {
  const useProvider = memoizeWith(identity, () => {
    if (typeof instance === "function") {
      instance = instance();
      if (isNil(instance)) {
        throw `[Provider-(${id})] 必須要有回傳值`;
      }
    }
    return instance;
  });

  return useProvider;
};
