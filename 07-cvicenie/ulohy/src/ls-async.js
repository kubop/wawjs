const fs = require("fs");
const path = require("path")

module.exports = lsRescursive

async function lsRescursive(dirName) {
  let dirs = await ls(dirName);
  dirs = dirsOnly(dirs);
  dirs = dirs.map(({ name }) => name);
  dirs = dirs.map(name => path.resolve(dirName, name));
  let files = await Promise.all(dirs.map(ls));
  files = files.flat();
  files = filesOnly(files);
  files = files.map(({ name }) => name);
  return files;
}

async function ls(dirName) {
  return fs.readdir(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}

