var express = require("express");

var app = express();


var lista = [
{"country":"ESPAÑA", "id": "1"},
{"country":"ITALIA", "id": "2"},
{"country":"EEUU",  "id": "3"},
{"country":"NORUEGA",  "id": "4"},
{"country":"IRLANDA", "id": "5"}
]


app.get("/country/name",(req,res) => {
	var limit = 2;
	var offset = 0;
	aux2 = [];

	for (var i = offset; i < lista.length; i++) {
				if (aux2.length <= (limit-1)) {
					aux2.push(lista[i]);
					console.log(aux2);
					console.log("------------------------");
				}
	}

	/*lista.forEach((contact) => {
		console.log(" - "+contact.country+" id: "+contact.id);

	});*/
});

app.listen(process.env.PORT || 10000);