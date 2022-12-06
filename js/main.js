import createDB,{db} from "./class/DB.js";
import * as sel from './selectors.js';
import {validateForm} from './functions.js'

document.addEventListener('DOMContentLoaded', () => {
    //Inicializando la Base de Datos
    createDB();
    //Eventos App
    sel.form.addEventListener('submit', validateForm);
});