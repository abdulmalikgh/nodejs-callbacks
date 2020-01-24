let http = require('http');
let fs = require('fs');

const server = http.createServer(function(req,res) {
    getTitle(res);
}).listen(8000,'127.0.01');

function getTitle(res) {
    fs.readFile('./titles.json', function(err,data) {
        if(err){
            hadError(err,res)
        }else {
            getTemplate(JSON.parse(data.toString(), res));
        }
    })
}

function getTitle(titles, res) {
    fs.readFile('./template.html', function(err,data){
      if(err) {
          hadeError(err,res)
      }  else {
          formatHtml(titles,data.toString(), res)
      }
    })
}
function formatHtml(titles, tmpl,res) {
    let html = tmpl.replace('%',titles.join('<li></li>'));
    res.writeHead(200, {'Content-Type':'text/html'})
    res.end(html)
}

function hadError(err,res) {
    console.error(err);
    res.end('Server Error');
}