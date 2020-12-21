export function urlToFilename(url) {
  return `./.gen-andy-testing/${String(url).replace("://", ".")}.html`;
}
