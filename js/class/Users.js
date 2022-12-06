class Users{
    //Create new User
    addUser(user,db){
        console.log(db);
        const transaction = db.transaction(['users'],'readwrite');
        const objectStore = transaction.objectStore('users');

        //Si hay algún error en la transaction, si no se logró realizar
        transaction.onerror = err => {
            console.log('error' + err);
        }
        //Si se realizó correctamente sin eventualidad
        transaction.oncomplete = () => {
            console.log('La transacción se realizó correctamente');
        }

        //Agregar el Objeto al Almacen
        objectStore.add(user);
    };
}

export default new Users();