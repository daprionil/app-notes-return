import ui from './class/UI.js';
import * as sel from './selectors.js';
import {db} from './class/DB.js';
import users from './class/Users.js';


let mode = false;

let user = {
    email:'',
    fullname:'',
    telefono:'',
    yearold:''
};

function validateForm(evt){
    evt.preventDefault();

    //Collect all datas from form
    const $ = evt.target;
    user = {
        ...user,
        email:$.email.value.trim(),
        fullname:$.fullname.value.trim(),
        telefono:$.telefono.value.trim(),
        yearold:$.yearold.value.trim()
    };
    //Validate All Data Inputs
    const validate = Object.entries(user).every(([key,val]) => {
        if(key === 'keyUser') return true;
        return val !== '';
    });
    if(!validate){
        ui.showMessage({form:sel.form,msg:'Complete todos los campos para continuar',type:'danger'});
        return;
    };
    
    //Validating yearold
    const numberYearold = Number(user.yearold);
    if(numberYearold < 1 || numberYearold > 99){
        ui.showMessage({form:sel.form,msg:'La edad no es válida',type:'danger'});
        return;
    }
    
    //Validate name content
    const validateName = (() => {
        const arrFullname = user.fullname.split('');
        //Iteration values
        const value = arrFullname.every(val => {
            if(val === ' ') return true;
            return isNaN(val);
        });
        return value;
    })();

    if(!validateName){
        ui.showMessage({form:sel.form,msg:'El nombre no es válido',type:'danger'});
        return;
    }
    
    //Validate state mode, And Edit or Add user
    if(mode){
        users.editUser({user:{...user},db});

        //Base actions before proccess
        ui.showMessage({form:sel.form,msg:'Editado Correctamente',type:'primary'});
        ui.viewAllUserBox(db);
        changingInputSubmit('Agregar');
        evt.target.reset();
        resetObject(user);
        mode = false;
        return;
    };
    //Add element in the dataBase
    users.addUser({user,db});

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
        resetObject(user);
    };
};

//Edit User Selected
function editUser(objUser){
    
    //Set form with information user selected
    fillForm(objUser);

    //Set data from objUser to object user global
    fillObjectUserGlobal(objUser);

    //Changing the button text in the form
    changingInputSubmit('Guardar');

    //Change Mode Form
    mode = true;
};

//Fill Form with information of Object User
function fillForm(user){
    //Iterates into user Object
    for(let key in user){
        if(sel.form[key]){
            //Set value in dinamic input form
            sel.form[key].value = user[key];
        };
    };
};

//Reset Object
function resetObject(obj){
    for(let i in obj){
        obj[i] = '';
    };
};


//Set Information from ObjectUser Selected to Object user Global
function fillObjectUserGlobal(objUser){
    for(const data in objUser){
        user[data] = objUser[data];
    };
};

function changingInputSubmit(msg){
    const input = sel.form.querySelector('input[type="submit"]');
    input.value = msg;
};
//Changing 

export {
    validateForm,
    createUserHtml
};