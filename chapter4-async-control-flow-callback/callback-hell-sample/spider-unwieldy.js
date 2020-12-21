import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import superagent from "superagent";
import { urlToFilename } from "./utils.js";

/**
 * Example of callback hell: has several levels of indentation and is very hard to read
 * @param {*} url 
 * @param {*} cb 
 */
export function spider(url, cb) {
  const filename = urlToFilename(url);

  // checks whether the URL was already downloaded by verifying that
  // the corresponding file was not already created. If err is defined and has type
  // ENOENT, then the file does not exist and it's safe to create it
  fs.access(filename, (err) => {
    if (err && err.code === "ENOENT") {
      console.log(`Downloading ${url} into ${filename}`);
      // download if file not found
      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          // make sure that the directory that will contain the file exists
          mkdirp(path.dirname(filename))
            .then(() => {
              // write the body of the HTTP response to the filesystem
              fs.writeFile(filename, res.text, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            })
            .catch((err) => {
              cb(err);
            });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
}
