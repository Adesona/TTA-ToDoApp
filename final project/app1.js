//add button trigger

document.querySelector('#addBtn').addEventListener('click', function(){
    const taskName = document.querySelector('#name1').value;
    const taskDescrip = document.querySelector('#descrip').value;
    const taskAssignedTo = document.querySelector('#assignTo').value;
    const taskDueDate = document.querySelector('#dueDate').value;
    const taskStatus = document.querySelector('#state').value;

    //test button works
    //console.log(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus);

//if validations work run this
    let checksValid = validateTaskForm(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus);

    //test for validation works
    //console.log(checksValid);

    if (checksValid == true) {        
     //create object
        createTaskObject(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus, myTaskManager.allTasks);
        let tIndex = myTaskManager.allTasks.length-1;        

        //test
        console.log(myTaskManager.allTasks[tIndex]);
        myTaskManager.addTask(myTaskManager.allTasks[tIndex])
    }

    
})

//form validation
function validateTaskForm(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus) {

    let formsValid = false;

    if ((taskName.length >= 3) && (taskDescrip.length >=10) && (taskAssignedTo.length >=3) && (taskDueDate) && (taskStatus != 'Select...')) {
        formsValid = true;        
    }

    return formsValid;    
}



document.addEventListener('click', function(event){
    const isButton = (event.target.nodeName == 'BUTTON');
    if(isButton) {
        const element = event.target;
        let buttonJob = element.attributes.job.value;

        if (buttonJob == "update") {
            myTaskManager.updateTask(element);            
        } else if (buttonJob == "delete") {
            myTaskManager.deleteTask(element);
        }        
    }  

})

//for (let i = 0; i < 3; i++) {   
//    createTaskObject(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus, myTaskArray);
//}

//Object
function createTaskObject(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus, myTaskArray) {
    myTaskManager.allTasks.push({
        "Name": taskName,
        "Descrip": taskDescrip,
        "AssignedTo": taskAssignedTo,
        "DueDate": taskDueDate,
        "Status": taskStatus,
        "ID": `${myTaskArray.length <1}`
    })

    return myTaskManager.allTasks;
}
//taskmanager
class TaskManager {
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

    getAllTasks(){
        console.log(this.allTasks);
    }

    //takes object from array to make tasks
    addTask(taskObj){



        let cardHTML =   `<div class="col-md-4" taskID="${taskObj.ID}">
                        <div class="card cardStyle">
                            <div class="card-header">
                                Task
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Task Name: ${taskObj.Name} </li>
                                <li class="list-group-item">Assigned To: ${taskObj.AssignedTo} </li>
                                <li class="list-group-item">Due Date: ${taskObj.DueDate} </li>
                                <li class="list-group-item">Description : ${taskObj.Descrip} </li>
                                <li class="list-group-item">Status: ${taskObj.Status} </li>
                            </ul>
                            <button type="button" class="btn btn-dark" job="delete" deleteID="${taskObj.ID}">Delete</button>
                            <a href='#form'><button type="button" class="btn btn-dark" id="upBtn" job="update" deleteID="${taskObj.ID}">Update</button></a>
                        </div>
                    </div>`

        let cardsHTMLrow = document.querySelector('#taskCard');
        cardsHTMLrow.innerHTML += cardHTML;



        let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                            <small>Due Date: ${taskObj.DueDate} </small>
                        </div>
                        <small>Status: ${taskObj.Status}</small>
                        </a>`

        let listHTMLrow = document.querySelector('#tasksPost');
        listHTMLrow.innerHTML += listHTML;          

    }

    deleteTask(element){
            
    //this removal from array

    let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
    for(let i=0; i < this.allTasks.length; i++){
        if(this.allTasks[i].ID == thistaskID){
            this.allTasks.splice(i,1);
            localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
        }
    }

    console.log(this.allTasks);

    //card removal
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)

    //task removal
    let elementsA = document.querySelectorAll('a');
    for(let i=0; i < elementsA.length; i++){
        element = elementsA[i];
        if(element.attributes.taskID.value == thistaskID){
            element.parentNode.removeChild(element);
        }
    }

    }

    updateTask(element){
        let currentTask = {};
        let currentTaskID = element.parentNode.parentNode.parentNode.attributes.taskID.value;

        for (let i=0; i < this.allTasks.length; i++) {
            if (this.allTasks[i].ID == currentTaskID) {
                currentTask = this.allTasks[i];
            }            
        }

        document.querySelector('#name1').value=currentTask.Name;
        document.querySelector('#descrip').value=currentTask.Descrip;
        document.querySelector('#assignTo').value=currentTask.AssignedTo;

        document.querySelector('#addBtn').outerHTML = `<button type="button" id="saveUpdate" class="btn btn-primary" job="saveUpdate">Save</button>`
        
        document.querySelector('#saveUpdate').addEventListener('click', function(){
            const taskName = document.querySelector('#name1').value;
            const taskDescrip = document.querySelector('#descrip').value;
            const taskAssignedTo = document.querySelector('#assignTo').value;
            const taskDueDate = document.querySelector('#dueDate').value;
            const taskStatus = document.querySelector('#state').value;

            let checksValid = validateTaskForm(taskName, taskDescrip, taskAssignedTo, taskDueDate, taskStatus);

            if (checksValid == true){
                currentTask.Name = taskName;
                currentTask.Descrip = taskDescrip;
                currentTask.AssignedTo = taskAssignedTo;
                currentTask.DueDate = taskDueDate;
                currentTask.Status = taskStatus;
                localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
                location.reload();
            }

        })
    }
}

let myTaskManager = new TaskManager("taskTest");


//local storage
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
    myTaskManager.allTasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.allTasks)
} else {
    myTaskManager.taskArray = [];
}
function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}




//let myTaskArray =[]