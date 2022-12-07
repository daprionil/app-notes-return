import ui from './class/UI.js';
import * as sel from './selectors.js';
import {db} from './class/DB.js';
import users from './class/Users.js';

function validateForm(evt){
    evt.preventDefault();

    //Collect all datas from form
    const $ = evt.target;
    const user = {
        email:$.email.value,
        fullname:$.fullname.value,
        telefono:$.telefono.value,
        yearold:$.yearold.value
    };
    
    //Validate Data
    const validate = Object.values(user).every(val => val !== '');

    if(!validate){
        ui.showMessage({form:sel.form,msg:'Complete todos los campos para continuar',type:'danger'});
        return;
    };
    
    if(Number(user.yearold) < 0){
        ui.showMessage({form:sel.form,msg:'La edad no es válida',type:'danger'});
        return;
    }
    
    //Validate name content
    const arrFullname = user.fullname.split('');
    console.log(arrFullname);
    const validateName = (() => {
        let value;
        
        //Iteration values
        for(let l of arrFullname){
            if(!isNaN(l)){
                value = !isNaN(l);
                break;
            }
        }
        return value;
    })();
    
    if(validateName){
        ui.showMessage({form:sel.form,msg:'El nombre no es válido',type:'danger'});
    }
    //Add element in the dataBase
    users.addUser(user,db);
};

export {
    validateForm,
    
}