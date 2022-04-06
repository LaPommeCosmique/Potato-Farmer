var http = require('http');
var url = require('url');

class Player {
    x = 0;
    y = 0;
  constructor (id) {
    this.id = id;
  }
}

function addPlayer(id) {
  if (players.find (player => player.id === id) === undefined) {
    players.push(new Player(id));
    return true;
  } else return false;
}

function removePlayer(id) {
  index = players.findIndex (player => player.id === id);
  if (index !== -1) {
    players.splice(index, 1);
    return true;
  } else return false;
}

function movePlayer(id, x, y) {
  index = players.findIndex (player => player.id === id);
  if (index !== -1) {
    players[index].x = x;
    players[index].y = y;
    return true;
  } else return false;
}



var players = [];

http.createServer(function (req, res) {
  parsedUrl = url.parse(req.url, true);
  if (req.method === "GET") {

    // REMOVE LATER
    if (parsedUrl.pathname === "/players") {
      query = parsedUrl.query;
      parseQuery(res, query);
    }



    if (parsedUrl.pathname === "/data") {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(players));
    } else sendError(res, 400);
  } else if (req.method === "POST") {
    if (parsedUrl.pathname === "/players") {
      query = parsedUrl.query;
      parseQuery(res, query);
    } else sendError(res, 400);
  } else sendError(res, 400);
}).listen(8080);

function sendError (res, code) { res.writeHead(code); res.end(); }

function parseQuery (res, query) {
    if (query.action === "create") {
      if (addPlayer(query.id) === true) {
        res.writeHead(201);
        res.end();
      } else sendError(res, 400);
    } else if (query.action === "delete") {       
      if (removePlayer(query.id) === true) {
        res.writeHead(201);
        res.end();
      } else sendError(res, 400);
    } else if (query.action === "move") {
      if (movePlayer(query.id, query.x, query.y) === true) {
        res.writeHead(201);
        res.end();
      } else sendError(res, 400);
    } else sendError(res, 400);
}