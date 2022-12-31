import saludar, {Saludar, PI, usuario} from"./constantes.js";
// import {sumar, restar} from"./aritmetica.js";
import {aritmetica as calculos} from"./aritmetica.js";
//la palabra as es un alias que se le pone para reducir la cantidad de digitos que hay que escribir para importar el objeto.

console.log("El mensaje es Archivo modulos.js");
console.log(PI, usuario);
// console.log(sumar(7,9));
// console.log(aritmetica.sumar(7,9));
console.log(calculos.sumar(7,9));
saludar();
let saludo=new Saludar();
