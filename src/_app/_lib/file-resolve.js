/**
 *
 * @param {string} filePath
 * @param {string} ext
 *
 * ./path/to/my-file.ext
 * ->
 * ./path/to
 */
export const getNormalize = (filePath) => {
  const paths = filePath.toLowerCase().split("/");
  return paths.slice(0, -1).join("/");
};

/**
 *
 * @param {string} filePath
 * @param {string} ext
 *
 * ./path/to/my-file.ext
 * ->
 * my-file
 */
export const getFilename = (filePath) => {
  const paths = filePath.toLowerCase().split("/");
  return paths[paths.length - 1].split(".")[0];
};
