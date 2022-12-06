export default new class{
    //show message
    showMessage({form,msg,type = 'danger'}){
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
    }
}