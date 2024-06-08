export default class Utils {
  generarCodigo4Digitos() {
    let codigo = Math.floor(Math.random() * 10000);
    return codigo.toString().padStart(4, "0");
  }
}
