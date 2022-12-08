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
    
    const validateName = (() => {
        const arrFullname = user.fullname.split('');
        //Iteration values
        return arrFullname.every(val => isNaN(val));
    })();

    if(!validateName){
        ui.showMessage({form:sel.form,msg:'El nombre no es válido',type:'danger'});
        return;
    }
    //Add element in the dataBase
    users.addUser(user,db);

    //Actions Base after from the proccess
    ui.showMessage({form:sel.form,msg:'Agregado Correctamente',type:'success'});
    ui.viewAllUserBox(db);
    
    //Reset Form
    evt.target.reset();
};

function createUserHtml(user){
    const {email,fullname,yearold,telefono,keyUser} = user;

    //Create Base Element "<a>" for list users html
    const a = document.createElement('a');
    a.classList.add('user');

    //Intern Element li
    const li = document.createElement('li');

    //Create Elements for adding in li Element
    const title = document.createElement('div');
    title.classList.add('title-info');
    title.innerHTML = `<p><strong>Nombre:</strong>${fullname}</p>`;

    const pEdad = document.createElement('p');
    pEdad.innerHTML = `<strong>Edad:</strong> ${yearold}`;
    
    const pEmail = document.createElement('p');
    pEmail.innerHTML = `<strong>Email:</strong> <span>${email}</span>`;
    
    const pTelefono = document.createElement('p');
    pTelefono.innerHTML = `<strong>Telefono:</strong> <span>${telefono}</span>`;

    const btns = document.createElement('div');
    btns.classList.add('btns-action');

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-eliminar');
    btnDelete.title = 'Eliminar Usuario';
    btnDelete.textContent = 'Eliminar';
    btnDelete.onclick = () => deleteUser(keyUser);
    
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-editar');
    btnEditar.textContent = 'Editar';
    btnEditar.title = 'Editar Usuario';
    btnEditar.onclick = () => editUser(user);

    //Integrated Elements Created
    btns.appendChild(btnDelete);
    btns.appendChild(btnEditar);

    li.appendChild(title);
    li.appendChild(pEdad);
    li.appendChild(pTelefono);
    li.appendChild(pEmail);
    li.appendChild(btns);

    a.appendChild(li);

    return a;
}

//Confirm delete user onclick
function deleteUser(keyUser){
    //Confirm validate, Delete User
    const validate = confirm('¿Desea Eliminar el Usuario?');

    if(validate){
        users.deleteUser({keyUser,db});
    };
}

//Edit User Selected
function editUser(user){
    
    //Set form with information user selected
    fillForm(user);
}

//Fill Form with information of Object User
function fillForm(user){
    //Iterates into user Object 
    for(let key in user){
        if(sel.form[key]){
            //Set value in dinamic input form
            sel.form[key].value = user[key];
        }
    }
}
export {
    validateForm,
    createUserHtml
}