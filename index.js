module.exports = {
  clipOutliers: require("./clip-outliers.js"),
  containsOnlyNumbers: require("./contains-only-numbers.js"),
  diagonalize: require("./diagonalize.js"),
  dropMissingPairwise: require("./drop-missing-pairwise.js"),
  getCorrelationMatrix: require("./get-correlation-matrix.js"),
  getCounts: require("./get-counts.js"),
  getHighlyCorrelatedColumns: require("./get-highly-correlated-columns.js"),
  getMagnitude: require("./get-magnitude.js"),
  getOneHotEncodings: require("./get-one-hot-encodings.js"),
  getPercentages: require("./get-percentages.js"),
  getPValueMatrix: require("./get-p-value-matrix.js"),
  gramSchmidtOrthonormalize: require("./gram-schmidt-orthonormalize.js"),
  isBinary: require("./is-binary.js"),
  normalize: require("./normalize.js"),
  preprocess: require("./preprocess.js"),
  project: require("./project.js"),
  rScore: require("./r-score.js"),
  sortCorrelationMatrix: require("./sort-correlation-matrix.js"),
}
