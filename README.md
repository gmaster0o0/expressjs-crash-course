# ExpressJS

## Mi az ExpressJS?

- Minimalista server oldali NodeJS framework

- Könnyű webes app-ot létrehozni

- Server oldali rendereles

- Ingyenes, Gyors

- Jól használható kliens oldali javascript mellett, (Angular, Vue, React). Nincs szükség több programozási nyelvre.

- Legnépszerűbb framework

- Egyszerű request response control

https://expressjs.com/

## Szükséges ismeretek

- Javascript és NodeJS alapok
- NPM alapok

## Mire van szükségünk

- NodeJS https://nodejs.dev/
- Szövegszerkesztő, IDE valami amibe írjuk a kódot.(Ajánlott: VsCode, Webstorm, vagy valami okosabb IDE) https://code.visualstudio.com/
- Postman https://www.postman.com/

## Project létrehozása

Projectet két féle képpen tudunk létrehozni:

### Kézzel saját magunk

Létrehozunk egy node package-t

```
mkdir projectneve
cd projectneve
npm init
```

Válaszolunk a kérdésekre, beállítjuk az entry pointot: index.js

```bash
#Express telepítése
npm install express
```

```javascript
//index.js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

illetve package.json fileba létrehozhatjuk a start script bejegyzést
`"start": "node index.js"`

```json
{
  "name": "nodejs-crash-course",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "gmaster",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

App inditása: npm start paranccsal

### Generátor segítségével

```bash
#Express generátor telepítése
npm install -g express-generator

#alkalmazasNEVE nevű alkalmazás létrehozása PUG template nyelvvel
express --view=pug alkalmazasNEVE

#függőségek telepítése
cd my alkalmazasNEVE
npm i

#alkalmazás inditása
npm start
```

természetsen lehet más generátort használni, vagy akár irhatunk sajátot.

## Route handling

**app.METHOD(PATH, HANDLER)**

- ### app: Express app példánya
- ### METHOD: http request method (POST,GET stb)
  Használható még:
  - app.use
  - app.all
- ### PATH: útvonal amit a hívunk pl: localhost:3000/users -> '/users'
  az útvonal lehet string vagy akár reqexp

Az összes abcd, abXYZcd és hansonló útvonalakra meghívódik

```javascript
app.get("/ab*cd", function (req, res) {
  res.send("ab*cd");
});
```

#### útvonal paraméter

Hogy hivítkozunk egy adott azonosítójú userre, ha az adott rész az útvonalba mindig változik?

Példa:
_localhost:3000/users/15_
_localhost:3000/users/25_

```javascript
app.get("/users/:id", function (req, res) {
  res.send(req.params);
  //req.params: {"userId": "25"}
});
```

Példa2:
\*localhost

- ### HANDLER: függvény ami akkor fut ha meghívjuk az útvonalat

Egy vagy akár több speciális függvény úgynevezett middleware.

Ezek lehetnek, egymás után felsorolva, vagy tömbbe, vagy vegyesen

```javascript
app.get('/a', function (req, res) {
  res.send('Hello from A!')
})

app.get('/ab', function (req, res) {
  next();
},function (req, res) {
  res.send('Hello from AB!')
)

//de lehet kulon definialva is
const A = (req,res,next) => {
    console.log('I am A');
    next();
}

const B = (req,res,next) => {
    console.log('I am B');
    next();
}

const B = (req,res,next) => {
    console.log('I am C');
    res.end();
}

app.get('/abc', [A,B,C]);

app.post('/abc'), A,B,C);

app.get('/vegyes', [A,B],C);

app.get('/lol', [A,B, (req,res,next)=> {
    console.log('I dont have name');
    next();
}], (req,res,next) => {
    console.log('Me either');
    res.end()
})
```

#### response methods

Olyan metódusok, amivel válaszolhatunk a kliens felé, és ez lezárja a request-response ciklust, egyéb esetbe hanging-elni fog a kliens.

- `res.end()`
- ``res.json()` - Json objectet kuld
- `res.render` - rendereli a megadott tempalte es elkuldi
- `res.send()` - több féle üzenet küldésre alkalmas. `res.send({valami}, 'json')`, ugyanaz mint `res.json({valami})`

## Router

routeok csoportosítása, átláthatóbbá tétele

### app.router

```javascript
app.get('/abc', A);
app.post('/abc'),B);
app.delete('/abc'), C);
app.put('/abc'), D);
```

helyett használhatjuk:

```javascript
app.router('/abc')
    .get(A);
    .post(B);
    .delete(C);
    .put(D);
```

### express.router

Ha szeretnénk külön router fileokat, használhatjuk a express.Router() osztályt:

```javascript
//user.router.js router module file
const express = require('express');

const router = express.Router();

const getUser = (req,res,next) => {...}
const createUser = (req,res,next) => {...}
const deleteUser = (req,res,next) => {...}
const updateUser = (req,res,next) => {...}

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/', deleteUser);
router.put('/', updateUser);

module.exports = router
```

```javascript
//app.js
const userRouter = require('./user.router.js');

...

app.use('/users',userRouter);
```

## Middleware

specialis függvény ami hozzáfér a request,response objectekhez.
legtöbbször 3 paramétere van:

- req request obj
- res response obj
- next fuggvlny ami a kovetkezo middleware-re mutat, es hivaskor at is ugrik ra.

### Feladatai:

- kód végrehajtása
- req, res object manipulálása
- következő middleware hívása
- végetvetni a req-res ciklusnak: res.end, res.json

### Típusai:

1. #### Application middleware

használata
`app.use(middleware);` globálisan minden beérkező requestre
`app.use('/user', middleware);`

2. #### Router middleware

lásd fenti példa az express.routernel

3. #### Error middleware

Ha a middleware-t 3 helyett 4 paraméterrel hívjuk meg

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

Ha barmikor a next fuggvenyt parameterrel hivjuk akkor kilep az adott handlerből és a middleware chainből kivéve azokből amik error middlewareként lettek definálva.

## Statikus file kiszolgálás

**express.static(root, [options])**

```javascript
//public konyvtar kiszolgalasa minden utvonalra
app.use(express.static("public"));
//public konyvtar kiszolgalasa csak a static utvonalra
app.use("/static", express.static("public"));
//ha masik konyvtarbol futtatjuk jobb ha abszolut utvonalat hasznalunk
app.use("/static", express.static(path.join(__dirname, "public")));
```

## Rendereles

res.render(str,locals,callback)

telepitsük a template packaget

npm i ejs

```javascript
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  //title valtozot atadjuk a rendernek igy ha az szerepel a template-be megtudjuk jeleniteni.
  res.render("index", { title: "Hey", message: "Hello there!" });
});
```

index.ejs (extended javascript template nyelv) példa

```ejs
<%# index.html %>
<h1><%= title%></h1>
```

template enginek:

- pug https://pugjs.org/api/getting-started.html
- ejs https://github.com/tj/ejs
- hbs https://github.com/janl/mustache.js

## res.locals app.locals

app.locals : applikacio szintu lokalis valtozo object
res.locals: request idejere ervenyes valtozo.

## Complex példa : Feladat API

ami kelleni fog:

ejs
morgan

npm install ejs morgan
