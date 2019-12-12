const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream")

module.exports={
                send: function(name){return zip_client(name)}, 
                close:function(){return close_server()}};

function zip_client(name){

  let url = "http://localhost:9999";
  let _name = [];

  if(name){
    _name.push(name)
  }
  else{
    _name = process.argv.slice(2)
  }
  const fileName = `${__dirname}/client-data/${_name[0]}`;
  const fileName2 = `${__dirname}/client-data/${_name[0]}.gz`;
  let input = fs.createReadStream(fileName);
  let output = fs.createWriteStream(fileName2);

  let request = http.request(url, {
      method: "POST"
    })
    .on("response", (res) => {

      pipeline(
        res,
        output,
        (err) => {if (err) {console.error(err)}}
        );

    });

  request.setHeader("file-name",name)

  pipeline(
    input,
    request,
    (err) => {if (err) {console.error(err)}}
    );
}

function close_server(){
  let url = "http://localhost:9999";
  let request = http.request(url, {
      method: "POST"
    });
  request.setHeader("close",true);
  request.end()
}
