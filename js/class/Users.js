class Users{
    //Create new User
    addUser(user,db){
        const transaction = db.transaction(['users'],'readwrite');
        const objectStore = transaction.objectStore('users');

        //Si hay algún error en la transaction, si no se logró realizar
        transaction.onerror = err => {
            console.log(err);
        }
        //Si se realizó correctamente sin eventualidad
        transaction.oncomplete = () => {
            console.log('La transacción se realizó correctamente');
        }

        //Agregar el Objeto al Almacen
        objectStore.add(user);
    };

    //Get users in the Data Base
    getUsers(db){
        //Get Object Store
        const objectStore = db.transaction('users','readonly').objectStore('users');

        objectStore.getAll().onsuccess = value => value.target.result;
    }
}

export default new Users();