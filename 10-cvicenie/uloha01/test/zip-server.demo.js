const server = require("../src/zip-server");
const client = require("../src/zip-client");

server.ziper();

client.send("data.txt");

client.send("img.jpg");

client.send("test.docx");

client.send("test-prednaska.pdf");

client.close()
