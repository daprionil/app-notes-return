import ui from './UI.js';
import * as sel from '../selectors.js';

class Users{
    //Create new User
    addUser({user,db}){
        const transaction = db.transaction(['users'],'readwrite');
        const objectStore = transaction.objectStore('users');

        //Si hay algún error en la transaction, si no se logró realizar
        transaction.onerror = () => {
            ui.showMessage({
                form:sel.form,
                msg:'Este usuario ya existe en la Base de Datos',
                type:'danger'
            });
        }
        //Si se realizó correctamente sin eventualidad
        transaction.oncomplete = () => {
            console.log('La transacción se realizó correctamente');
        }

        //Agregar el Objeto al Almacen
        objectStore.add(user);
    };
    
    //Delete User
    deleteUser({db,keyUser}){
        const transaction = db.transaction(['users'],'readwrite');
        const objectStore = transaction.objectStore('users');

        //Si hay algún error en la transaction, si no se logró realizar
        transaction.onerror = () => {
            ui.showMessage({
                form:sel.form,
                msg:'No se ha podido Eliminar el Usuario',
                type:'danger'
            });
        }
        //Si se realizó correctamente sin eventualidad
        transaction.oncomplete = () => {
            //Reload View HTML Users
            ui.viewAllUserBox(db);
        }

        //Eliminar el Objeto al Almacen
        objectStore.delete(keyUser);
    };
    

    //Edit a user, Put or Patch
    editUser({user,db}){
        const transaction = db.transaction(['users'],'readwrite');
        const objectStore = transaction.objectStore('users');

        //Si hay algún error en la transaction, si no se logró realizar
        transaction.onerror = () => {
            ui.showMessage({
                form:sel.form,
                msg:'No fue posible actualizar el Usuario',
                type:'danger'
            });
            window.location.reload();
        };
        //Si se realizó correctamente sin eventualidad
        transaction.oncomplete = () => {
            console.log('La transacción se realizó correctamente');
        }

        //Editar el Objeto al Almacen
        objectStore.put(user);
    }
}

export default new Users();