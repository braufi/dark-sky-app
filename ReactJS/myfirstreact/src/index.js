import React from 'react';
import ReactDOM from 'react-dom';

const myfirstelement = <h1>Hello React!</h1>;
const carElement = (
  <ul>
    <li>Chevy</li>
    <li>Mercedes</li>
    <li>BMW</li>
    <li>Audi</li>
  </ul>
);

class Car {
  constructor(name){ this.brand = name;}
  present() { return 'I have a ' + this.brand; }
}

class Model extends Car{
  constructor(name, mod){
    super(name);
    this.model = mod;
  }
  show() {
      return this.present() + ', it is a ' + this.model;
  }
}
let mycar = new Model("Ford", "Mustang");

ReactDOM.render(carElement, document.getElementById('cars'));
ReactDOM.render(myfirstelement, document.getElementById('root'));
document.write(mycar.show());
