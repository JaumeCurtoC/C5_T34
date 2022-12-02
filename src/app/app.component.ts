import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C5_T34';

  botones:string[] = ['9','8','7','6','5','4','3','2','1','0','00','.'];
  operadores:string[] = ['DEL','/','*','+','-','='];
  operacion:string = '';
  resultado:any = '';

anadir(operador:any){

  if (operador.target.value === "DEL") {
    this.operacion = '';
  } else if (operador.target.value === "=") {
    this.calcular();
  }else{
    this.operacion = this.operacion.concat(operador.target.value).trim();
  }
}

calcular(){
  //Separo los números de los operadores
  let numerosYOperadores = this.separarNumerosOperadores();
  let [a, b, signo]:string = numerosYOperadores;

  switch (signo) {
    case "+":
      this.resultado = Number(a) + Number(b);
      break;
    case "-":
      this.resultado = Number(a) - Number(b);
      break;
    case "*":
      this.resultado = Number(a) * Number(b);
      break;
    case "/":
      this.resultado = Number(a) / Number(b);
      break;
  }
}

separarNumerosOperadores() {
  let numerosYOperadores:any = [];

  //Primero me fijo que sea una operación válida
  const operacionRegex =
    /^([-]?[0-9]+[\.]?[0-9]*)[\+\*-\/]([-]?[0-9]+[\.]?[0-9]*)$/g;

  if (operacionRegex.test(this.operacion) === true) {
    //Regex para separar los números de las operaciones, busco un número seguido de un operador, lo que implica que es la división
    const separador = /[0-9][\+\*\/\-]/g;
    //Busco esto en la cadena
    const match = separador.exec(this.operacion);
    if (match != null) {
      //Separo los números de la operación teniendo en cuenta el index del operador
      numerosYOperadores.push(this.operacion.slice(0, match.index + 1));
      numerosYOperadores.push(this.operacion.slice(match.index + 2));

      //Tomo la operación
      let operacion = match[0].charAt(1);
      numerosYOperadores.push(operacion);
      //Retorno el array con los 3 elementos de la operación
      return numerosYOperadores;

    }
  } else {
    this.resultado = "Error de cálculo";
    return;
  }
}



}
