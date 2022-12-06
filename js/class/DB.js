let db;

function createDB(){
    const DB = window.indexedDB.open('users',1);
    
    //En caso de que el navegador no soporte indexedDB o haya una version
    //mas actual en el navegador a la que se necesita configurar
    DB.onerror = error => {
        console.log(`Ha habido un error ${error}`);
    };
    
    //
    DB.onsuccess = e => {
        db = e.target.result;
    };
    
    //Se ejecuta cuando hay una versión anterior a la actual
    //En caso de ser primera vez, la versión de la base de datos es 0
    DB.onupgradeneeded = e => {
        db = e.target.result;

        //Create Object Store
        const objectStore = this.db.createObjectStore('users',{keyPath:'keyUser',autoIncrement:true});

        objectStore.createIndex('fullname','fullname',{unique:false});
        objectStore.createIndex('telefono','telefono',{unique:true});
        objectStore.createIndex('yearold','yearold',{unique:false});
        objectStore.createIndex('email','email',{unique:true});
    }; 
}

export default createDB;
export {
    db
}