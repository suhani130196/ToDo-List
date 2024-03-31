// const { number } = require("yargs");

function createTask(){
    const taskBox = document.getElementById("add-task-box");
    const listContainer = document.getElementById("list-container");
    const listContainerelements = listContainer.getElementsByTagName('div')
    if (taskBox.value === ''){
        alert ("You must enter something!");
    }else{
        // console.log(listContainerelements.length);
        let container = document.createElement('div')
        container.className = 'lidiv'   

        let number = listContainerelements.length+1;
        container.id = number;     
        
        //add check box to task//
        let checkbox = document.createElement('input');
        checkbox.id = 'checkbox'+ number;
        checkbox.setAttribute('onClick', 'checkedBox(id)')
        checkbox.className = 'inputCheck'
        checkbox.type = 'checkbox'
        checkbox.value = taskBox.value;
        
        //add label to checkbox//
        let label = document.createElement("label");  
        label.className = 'label'
        label.id = 'label'+number
        label.innerText = taskBox.value;  

        //adding remove task button//
        let removebtn = document.createElement('button');
        removebtn.id =  'remove'+ number;
        removebtn.setAttribute('onClick', 'removeTask(id)');
        removebtn.innerText = 'x';
        removebtn.className = 'remove'

        //adding edit task button in div//        

        container.appendChild(checkbox)   
        container.appendChild(label)
        let editButton = addEditBtn(number)
        container.appendChild(editButton)
        container.appendChild(removebtn)
        listContainer.appendChild(container);
    }
}
function checkedBox(checkboxId){
    let number = checkboxId.substr(8)
    let checkbox = document.getElementById(checkboxId);
    let label = document.getElementById("label" + number)
    if (checkbox.checked == true){
        label.style.textDecoration = 'line-through'
    } else {
        label.style.textDecoration = 'none'
    }
}
function removeTask(removeId){
    // console.log(removeId)
    let number = removeId.substr(6)
    let divElement = document.getElementById(number);
    divElement.remove();
}
function edit(editId){
    let number = editId.substr(4)
    console.log(number)
    let label = document.getElementById("label" + number)
    // label.setAttribute('hidden', true);
    label.style.display = 'none';

    // create new input element
    let container = document.getElementById(number)
    // console.log('harshit label value is: ' + label.innerText)
    let editlabel = document.createElement("input");
    editlabel.id = 'editlabel' + number;
    editlabel.setAttribute('type', 'text');
    editlabel.className = 'elabel'

    // populate label value
    editlabel.setAttribute('value', label.innerText);

    container.appendChild(editlabel);

    //insert input element before label element//
    container.insertBefore(editlabel, label);

   // hide edit button & create save button

    let savebtn = document.createElement('button');
    savebtn.innerText = 'Save';
    savebtn.id = 'save' + number;
    savebtn.className = 'save-btn';
    container.appendChild(savebtn);


    container.insertBefore(savebtn, label);


    let hideBtn = document.getElementById('edit' + number)
    // hideBtn.style.visibility = 'hidden';
    hideBtn.remove();

    

   // create cancel button
   let cancelbtn = document .createElement('button');
   cancelbtn.innerText = 'Cancel';
   cancelbtn.className = "cancel-btn";
   cancelbtn.id = 'cancel' + number;

   container.appendChild(cancelbtn);

   container.insertBefore(cancelbtn, label);

    //set onclick for save button//
   savebtn.setAttribute('onClick', 'saveValue(id)');

    //set onclick for cancel button//
    cancelbtn.setAttribute('onClick', 'cancel(id)');

}


//create function to save edited value into original value
function saveValue(id){
    let number = id.substr(4)

    let label = document.getElementById('label' + number);

    let editlabel = document.getElementById('editlabel' + number);    
    label.innerText = editlabel.value; 
    closeEditing(number)
}

function cancel(id) {
    let number = id.substr(6)
    closeEditing(number)
}

function closeEditing(number) {    
    let container = document.getElementById(number)
    
    let label = document.getElementById('label' + number);

    let editlabel = document.getElementById('editlabel' + number);    

    editlabel.remove();

    label.style.display = '';


    let hideSaveBtn = document.getElementById('save' + number);
    hideSaveBtn.remove();
    
    let CancelBtn = document.getElementById('cancel' + number);
    CancelBtn.remove();

    let editButton = addEditBtn(number)
    let removeButton = document.getElementById('remove' + number)
    container.insertBefore(editButton, removeButton)
}

function addEditBtn(number){    
    let editTask = document.createElement('button');
    editTask.innerText = "Edit";
    editTask.id = 'edit' + number;
    editTask.className = 'edit'
    editTask.setAttribute('onClick', 'edit(id)');    

    return editTask
}

