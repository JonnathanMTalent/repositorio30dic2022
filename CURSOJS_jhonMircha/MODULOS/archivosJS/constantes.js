export const PI=Math.PI;

export let usuario="jon";
let password="qwerty";
// export default password; // cuando es una variable o una constante la que se exporta por default toca primero declararla y luego en otra linea exportartala por default, porque las variables y const hacen hoisting y no esta definidas al momento. esto ocurre por que el default carga por defecto mientras que las otras exportaciones  solo cuando se invocan o se usan.

const hello=()=> console.log("hola");

// solo se puede tener una exportacion por default
export default function saludar(){
    console.log("Hola mundo funcion (Default)")
}

export class Saludar {
    constructor (){
        console.log("Hola clase Saludar: Módulos + ES6");
    }
}