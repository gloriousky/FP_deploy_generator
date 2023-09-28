import { getFilename } from "./_lib/name-case";
const files = import.meta.globEager("../directives/*.js");

const directives = {
  install: (app) => {
    for (let path in files) {
      const { name = null, direcitve } = files[path].default;
      app.directive(name ?? getFilename(path), direcitve ?? {});
    }
  },
};

export default directives;
