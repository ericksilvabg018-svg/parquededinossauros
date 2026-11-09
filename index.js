import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))



import Especie from './models/Especie.js'
import Dinossauro from './models/Dinossauro.js'
import Paleontologo from './models/Paleontologo.js'

app.get('/', (req, res) => {
    //envio de informação para o EJS
    res.render("index");
})

app.get('/dinossauro/add', async (req, res) => {
  const especies = await Especie.find()
    res.render("dinossauro/add", {especies});
})

app.get('/dinossauro', async (req, res) => {
    const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst", {dinossauros});
})

//Rota POST pra gravar no Banco de Dados
app.post('/dinossauro/add',  async (req, res) => {
  const {nome,especie,peso,altura,anoDescoberta,dieta,descricao} = req.body
  await Dinossauro.create({nome,especie,peso,altura,anoDescoberta,dieta,descricao})
  res.redirect("/dinossauro")
})
app.get('/dinossauro/upd/:id', async  (req, res) => {
  const dinossauro = await Dinossauro.findById(req.params.id)
  const especies = await Especie.find()
  res.render("dinossauro/upd", {dinossauro, especies});
})

app.post('/dinossauro/upd/:id',  async (req, res) => {
  const {nome,especie,peso,altura,anoDescoberta,dieta,descricao} = req.body
  await Dinossauro.findByIdAndUpdate(req.params.id, {nome,especie,peso,altura,anoDescoberta,dieta,descricao})
  //listar espécies
  const dinossauros= await Dinossauro.find()
  res.render("dinossauro/lst", {dinossauros});

})

app.get('/dinossauro/del/:id',  async (req, res) => {
  await Dinossauro.findByIdAndDelete(req.params.id)
  res.redirect("/dinossauro")
})

app.get('/especie',  async (req, res) => {
 //listar espécies
 const especies = await Especie.find()
 res.render("especie/lst", {especies});

})

app.get('/especie/del/:id',  async (req, res) => {
  await Especie.findByIdAndDelete(req.params.id)
 //listar espécies
 const especies = await Especie.find()
 res.render("especie/lst", {especies});

})
app.get('/especie/upd/:id', async  (req, res) => {
  //buscar o registro que quero alterar
  const especie = await Especie.findById(req.params.id)
  res.render("especie/upd", {especie});
})

app.post('/especie/upd/:id',  async (req, res) => {
  
  const {id,nome,periodo} = req.body
  await Especie.findByIdAndUpdate(id, {nome,periodo})
  //listar espécies
  const especies = await Especie.find()
  res.render("especie/lst", {especies});

})

app.get('/especie/add',  (req, res) => {
  res.render("especie/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/especie/add',  async (req, res) => {
  const {nome,periodo} = req.body
  await Especie.create({nome,periodo})
  res.render("especie/add");
})

app.get('/paleontologo',  async (req, res) => {
 //listar paleontologos
 const paleontologos = await Paleontologo.find()
 res.render("paleontologo/lst", {paleontologos});

})

app.get('/paleontologo/add',  (req, res) => {
  res.render("paleontologo/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/paleontologo/add',  async (req, res) => {
  const {nome,nascimento,descoberta} = req.body
  await Paleontologo.create({nome,nascimento,descoberta})
  res.redirect("/paleontologo");
})
 app.get('/paleontologo/upd/:id', async  (req, res) => {
  const paleontologo = await Paleontologo.findById(req.params.id)
  res.render("paleontologo/upd", {paleontologo});
})
app.post('/paleontologo/upd/:id',  async (req, res) => {
  const {nome,nascimento,descoberta} = req.body
  await Paleontologo.findByIdAndUpdate(req.params.id, {nome,nascimento,descoberta})
  res.redirect("/paleontologo");
})

app.get('/paleontologo/del/:id',  async (req, res) => {
  await Paleontologo.findByIdAndDelete(req.params.id)
 const paleontologos = await Paleontologo.find()
 res.render("paleontologo/lst", {paleontologos});
})

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
})