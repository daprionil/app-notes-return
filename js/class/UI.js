import * as sel from '../selectors.js';
import {createUserHtml} from '../functions.js';

export default new class{
    //show message
    showMessage({form,msg,type = 'danger'}){
        const msgExist = form.querySelector('.message-box-alert');

        if(msgExist) return;

        const eleExist = form.querySelector('.message-box-alert success');

        //IIf a message box exists in the document element
        if(eleExist) return;

        //if the element "messageBox" does not exist
        const msgBox = document.createElement('div');
        msgBox.classList.add('message-box-alert',`${type}`);
        msgBox.textContent = msg;

        //Add element in the document form
        const beforeChild = form.querySelector('input[type="submit"]').parentElement;
        form.insertBefore(msgBox,beforeChild);

        //delete the message after time
        setTimeout(() => {
            msgBox.remove();
        }, 4000);
    };

    //View All users created in Data Base
    viewAllUserBox(db){;
        this.clearBoxUsers();

        const objectStore = db.transaction('users','readonly').objectStore('users');
        objectStore.getAll().onsuccess = value => {
            const arrUsers = value.target.result;
            
            //Create Document Fragment for Elements Users HTML
            const frag = document.createDocumentFragment();
            arrUsers.forEach(user => {
                frag.appendChild(createUserHtml(user));
            });
            //Adding Fragment with users in HTML
            sel.ctnUsers.appendChild(frag);
        };
    }

    //Clear Box ctn-users 
    clearBoxUsers(){
        while(sel.ctnUsers.firstElementChild){
            sel.ctnUsers.firstElementChild.remove();
        }
    }
}