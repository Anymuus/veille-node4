const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public'));

const transforme_en_tableau = (collection) =>{
    let chaine = '<table>'
    for(elm of collection){
        for(p in elm){
        }
    }
    chaine += '</table>'
    return chaine
}

///////////////////////////// route formulaire ////////////////
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "04_form.html" );
})


/////////////////// Route /////////////////////
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

app.get('/membres' , function (req, res) {
	 console.log(__dirname);
 res.sendFile( __dirname + "/public/data/membres.txt", 'utf-8', (err, data) => {
 	if (err) throw err;
     let liste = JSON.parse(data);
     let html = "<!DOCTYPE html>";
    html+= "<html>";
    html+= "<head>";
    html+= "<style>table{background-color:tomato; color:white; border: solid 1px solid} td{border:dashed 1px white}</style>";
    html+= "</head>";
    html+="<table>"
    html+="<thead><tr><th>Les membres</th></tr></thead>";
    html+="<tbody>";


 	  for(membres in liste){
 	  	html+= "<tr>";
 	  	html+= "<td>";
 	  	html+= "liste[membres].prenom";
 	  	html+= "</td>";
 	  	html+="</tr>";

 	  	html+= "<tr>";
 	  	html+= "<td>"
 	  	html+= "liste[membres].nom"
 	  	html+= "</td>"
 	  	html+="</tr>";

 	  	html+= "<tr>";
 	  	html+= "<td>"
 	  	html+= "liste[membres].telephone"
 	  	html+= "</td>"
 	  	html+="</tr>";

 	  	html+= "<tr>";
 	  	html+= "<td>"
 	  	html+= "liste[membres].courriel"
 	  	html+= "</td>"
 	  	html+="</tr>";

 	  	html+= "<tr>";
 	  	html+= "<td>"
 	  	html+= "liste[membres].id"
 	  	html+= "</td>"
 	  	html+="</tr>";


 	  }

 	  html += "</tbody></table></style>";

       res.end(data);
 	  
 	 })
	})


//////////////////////////////////////// route traiter Get //////////////////////
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.cour
 };

 fs.readFile (__dirname + '/public/data/membres.txt', 'utf-8', (err, data) =>{
 	if(err) throw err;
 	let liste = JSON.parse(data);
 	liste.push(reponse);
 	fs.writeFile(__dirname + '/public/data/membres.txt', JSON.stringify (liste), 'utf-8', (err) =>{
 		if (err) throw err:
 		res.end(JSON.stringify(liste));
 	})
  });
})


var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})