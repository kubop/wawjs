const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream")

const zlib = require("zlib");
const {
  createDeflate, createInflate, 
  createGzip,createGunzip,
  createUnzip
} = require("zlib");

module.exports={ziper: function(){return zip_server()}};

function zip_server(){

  let server = http.createServer()

  server.listen(9999, "localhost")
    .on("request", (req, res) => {

      const name = req.headers["file-name"];
      const closeFlag = req.headers["close"];
      const fileName = `${__dirname}/server-data/${name}`;
      
      if(closeFlag){
      server.close();
      console.log("closing server");
    }else{

        let output = fs.createWriteStream(fileName);

      pipeline(
        req, 
        output,
        (err) => {
          if(err){
            console.error(err)
          }
          else{
            pipeline(
              fs.createReadStream(fileName),
              createGzip(),
              res,
              (err) => {if (err) {console.error(err); }
              }
            );
          }
        });
    };

    });
}
