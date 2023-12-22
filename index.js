const http = require("http");
const app = require("./app");

const port = 7777;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
