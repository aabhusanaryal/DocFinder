import Fuse from "fuse.js";
import flask from "./flask.js";

const options = {
  isCaseSensitive: false,
  includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: true,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  useExtendedSearch: true,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name"],
};

function search(keyword, language) {
  if (language == "flask") {
    const fuse = new Fuse(flask, options);
    let toSearch = keyword;
    return fuse.search(toSearch);
  }
}

export { search };
