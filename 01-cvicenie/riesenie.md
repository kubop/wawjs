# Zaujímavé JavaScript aplikácie 

- Prettier - Prettier is an opinionated code formatter
- TeslaJS - An unofficial NodeJS library that encapsulates the Tesla RESTful API
- promise - simple implementation of Promises

## Prettier

<https://www.npmjs.com/package/prettier>

### Ukážka aplikácie

- <https://prettier.io/playground/>

### Charakteristika

Prettier je full stack javascript aplikácia, ktorá zabezpečuje formátovanie javascript/html/css... kódu, tým pádom je kód konzistentný. Je môžné túto aplikáciu využívať priamo v rôznych editoroch ako napríklad Atom, Emacs, Sublime, Vim a iné.

## TeslaJS

<https://www.npmjs.com/package/teslajs>

Javascript knižnica, ktorá umožnuje komunikáciu s autom značky Tesla, dokážeme vďaka nej čítať rôzne informácie o aute ako napríklad stav batérie, VIN, ovládať klimatizáciu, zamykanie auta, nabíjanie a mnoho ďalších vecí.

### Ukážka aplikácie

Príklad: Jednoduché získanie autorizačného tokenu, vďaka ktorému je možné komunikovať s autom.

    var tjs = require('teslajs');
 
    var username = "<your MyTesla email>";
    var password = "<your MyTesla password>";
 
    tjs.login(username, password, function(err, result) {
        if (result.error) {
          console.log(JSON.stringify(result.error));
          process.exit(1);
        }
 
        var token = JSON.stringify(result.authToken);
 
        if (token)
            console.log("Login Succesful!");
    });

Príklad: Zistenie aktuálneho stavu batérie, kde authToken je autorizačný token vrátený pri úspešnom volaní funkcie login() a vehicle ID je ID vrátene funkciou vehicle()

	var options = { authToken: result.authToken, vehicleID: vehicle.id_s };
    tjs.chargeState(options, function (err, chargeState) {
        console.log("Current charge level: " + chargeState.battery_level + '%');
    });


### Charakteristika

CLI aplikácia s parsovaním príkazového riadku pomocou modulu commander.

## promise

<https://www.npmjs.com/package/promise>

Synchrónne funkcie v JS sú blokujúce, ako napríklad čítanie zo súboru funkciou .readFileSync(), takýmto funkciám sa snažíme vyhnúť, pretože spomaľujú beh aplikácie. Bežný spôsob ako sa tomuto vyhnúť je použitie callback(), kde ale môžu nastať rôzne problémy a kód sa stáva veľmi neprehľadným, viď ukážku:

    function readJSON(filename, callback){
      fs.readFile(filename, 'utf8', function (err, res){
        if (err) return callback(err);
        try {
          res = JSON.parse(res);
        } catch (ex) {
          return callback(ex);
        }
        callback(null, res);
      });
    }

### Ukážka aplikácie

Príklad: Načítanie súboru pomocou promise

    function readFile(filename, enc){
      return new Promise(function (fulfill, reject){
        fs.readFile(filename, enc, function (err, res){
          if (err) reject(err);
          else fulfill(res);
        });
      });
    }

    function readJSON(filename){
      return readFile(filename, 'utf8').then(JSON.parse);
    }



 