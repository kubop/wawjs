const assert = require("assert");
const crypto = require('crypto');
const fs = require('fs');

const f1_name = "data.txt";
const f2_name = "img.jpg";
const f3_name = "test.docx";
const f4_name = "test-prednaska.pdf";

describe("Zipper Tests", () => {

  it("files are correctly saved by server", () => {
    const f1   = fs.readFileSync(`./src/client-data/${f1_name}`);
    const f1_s = fs.readFileSync(`./src/server-data/${f1_name}`);
    
    const f2   = fs.readFileSync(`./src/client-data/${f2_name}`);
    const f2_s = fs.readFileSync(`./src/server-data/${f2_name}`);

    const f3   = fs.readFileSync(`./src/client-data/${f3_name}`);
    const f3_s = fs.readFileSync(`./src/server-data/${f3_name}`);

    const f4   = fs.readFileSync(`./src/client-data/${f4_name}`);
    const f4_s = fs.readFileSync(`./src/server-data/${f4_name}`);

    const h1   = crypto.createHash('sha1').update(f1).digest().toString();;
    const h1_s = crypto.createHash('sha1').update(f1_s).digest().toString();;
  
    const h2   = crypto.createHash('sha1').update(f2).digest().toString();
    const h2_s = crypto.createHash('sha1').update(f2_s).digest().toString();

    const h3   = crypto.createHash('sha1').update(f3).digest().toString();
    const h3_s = crypto.createHash('sha1').update(f3_s).digest().toString();

    const h4   = crypto.createHash('sha1').update(f4).digest().toString();
    const h4_s = crypto.createHash('sha1').update(f4_s).digest().toString();

    assert(h1 == h1_s);
    assert(h2 == h2_s);
    assert(h3 == h3_s);
    assert(h4 == h4_s);
  });
});