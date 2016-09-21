var express, app;

express = require('express');
app = express();

app.use(express.static(__dirname));

app.listen(5000);

console.log("Server running on port 5000");
