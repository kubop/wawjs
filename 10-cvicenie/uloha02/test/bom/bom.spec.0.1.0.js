const bom = require("../../src/bom");

const assert = require("assert");
const fs = require("fs");

describe("bom_rem.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("remove bom - shell remove bom from file", function(done) {

    var chunks = [];

    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file)

      .pipe(bom.remove())

      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);
  
        assert(Buffer.isBuffer(chunk));
        assert.equal(chunk.indexOf(bomBuffer), -1);
        assert.equal(chunk[0], 0x2f);
        assert.equal(chunk.length, 7);
        done();
      })
  });



  it("remove bom - shell does not remove bom from empty file", function(done) {

    var chunks = [];

    let file = `${__dirname}/data/without-bom-empty.txt`;
    fs.createReadStream(file)
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);

        assert.equal(chunk.indexOf(bomBuffer), -1);
        assert.equal(chunk.length, 0);

        done();
      });
  });


   it("remove bom - shell does nothing to file without bom", (done) => {

    var chunks = [];

    let file = `${__dirname}/data/without-bom.txt`;
    fs.createReadStream(file)
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);

        fs.readFile(file, (err, data) => {
          assert(
            chunk.equals(data),
            `unexpected \n${JSON.stringify(chunk)}`
          );
          done();
        });

      });
  });

    it("remove bom - shell work with arbitrary chunks sizes", (done) => {

    var chunks = [];

    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file, { highWaterMark: 2 })
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);

        assert.equal(chunk.indexOf(bomBuffer), -1);
        assert.equal(chunk[0], 0x2f);
        assert.equal(chunk.length, 7);
        done();
      
      });
  });


 it("remove bom - shell remove only one bom from file", function(done) {

    var chunks = [];

    let file = `${__dirname}/data/with-bom-double.txt`;
    fs.createReadStream(file)

      .pipe(bom.remove())

      .on("error", done)
      .on("data", (chunk) => chunks.push(chunk))
      .on("finish", () => {

        let chunk = Buffer.concat(chunks);
  
        assert(Buffer.isBuffer(chunk));
        assert.equal(chunk.indexOf(bomBuffer), 0);
        assert.equal(chunk[3], 0x2f);
        assert.equal(chunk.length, 3 + 7);
        done();
      })
  });

 it("remove bom - shall not buffer all until _flush", (done) => {

    let called = 0;

    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file, { highWaterMark: 1 })
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => {
        called++;
        
      })
      .on("finish", () => {
        assert(called === "// with".length)
        done();
      });
  });

});
