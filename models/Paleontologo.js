import conexao from "../config/conexao.js";
const PaleontologoSchema = new conexao.Schema({
  nome: { type: String,required: true},
  nascimento: {type: Number,required: false},
  descoberta: {type: String,required: true}
});
const Paleontologo = 
conexao.model("Paleontologo", PaleontologoSchema);
export default Paleontologo;