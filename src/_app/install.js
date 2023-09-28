import layouts from "./layouts";
import providers from "./providers";
import directives from "./directives";

const install = (app) => {
  app.use(layouts);
  app.use(providers);
  app.use(directives);
};

export default install;
