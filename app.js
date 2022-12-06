var studentArray = [];
var studentID =  0;
document.getElementById('addStudent').addEventListener('click', addStudent);
let studentList = document.getElementById('studentList');



function addStudent()  {
    // first task  - get handle for all the subjects
    
    //alert("add Student");
    let english = getHandleValue('english');
    let math = getHandleValue('math');
    let physics = getHandleValue('physics');
    let computer = getHandleValue('computer');
    let science = getHandleValue('science');
    

    // need to care for the student  id
    studentID++; // studentID = studentID + 1

    // second task - add this data into an array
    const studentObject = {
        studentID : studentID,
        english: english,
        math: math,
        physics: physics,
        computer: computer,
        science : science,
        avg: getAverage() //will only work when form has values
      };

    studentArray.push(studentObject);
    console.log('student array size is : ' + studentArray.length);
    // blank out add Student form
    // getHandleValue('english', 'clear');
    // getHandleValue('math', 'clear');
    // getHandleValue('physics', 'clear');
    // getHandleValue('computer', 'clear');
    // getHandleValue('science', 'clear');
    
    renderStudentList();
   
    }


//document.getElementById('addStudent').addEventListener("click", () => { updateStudent() });


function getHandleValue(idName, operator) {
    
    if (operator === 'clear') {
        document.getElementById(idName).value = "";
    } else {
        
        const value = parseInt(document.getElementById(idName).value);
        console.log(value);
        //alert(value);
        return value;
    }

    

}
    function getTotal() {
        //console.log("app js starts loading")
        let english = getHandleValue('english');
        let math = getHandleValue('math');
        let physics = getHandleValue('physics');
        let computer = getHandleValue('computer');
        let science = getHandleValue('science');
        //console.log("app js ends loading")
        let total = english + math + physics + computer + science;
        document.getElementById('total').innerHTML = total;
        return total;

    }

    function getAverage() {
        // option  1
        // const total = parseInt(document.getElementById('total').innerHTML);
        // const average = total / 5;
        // document.getElementById('average').innerHTML = average;

        // option 2
        const average = getTotal() / 5;
        document.getElementById('average').innerHTML = average;
        return average;
    }
    function getGrade() {
        //let grade = "";
        let grade = getAverage();

        if (average >=99) {
            grade = "A";
            document.getElementById('grade').innerHTML = grade;
            return grade;
        }
        else if (average >=80 && average <=99) {
            grade = "B";
            document.getElementById('grade').innerHTML = grade;   
            return grade;
        }
        else {
            grade = "C";
            document.getElementById('grade').innerHTML = grade; 
            return grade;
        }
    }

    function getClassAvg() {
        let classAverageSum = 0;
        for (studentIndex =0; studentIndex < studentArray.length; studentIndex++) {
            classAverageSum = classAverageSum + studentArray[studentIndex].avg;
        }
        let classAverage = classAverageSum/studentArray.length;
        document.getElementById('class-Avg').innerHTML = classAverage;
    }
    
    // document.getElementById('addStudent').addEventListener('click', () => {addStudent()});
    //document.getElementById('updateStudent').addEventListener('click', updateStudent);
    

    function renderUI(studentID, english, math, physics, computer, science) {
        const display = `
    
        <div class='student' id=${studentID}>
           <h1>Student ID: ${studentID} </h1>
           <br>
           <h4>English Grade: ${english}</h4>
           <h4>Math Grade: ${math}</h4>
           <h4>Physics Grade: ${physics}</h4>
           <h4>Computer Grade: ${computer}</h4>
           <h4>Science Grade: ${science}</h4>
           <input type='button' value='Delete' class="delete">
           <input type='button' value='Update' class="update">
       </div>
       <br>
       

        `
        
        return display;
    }
    
    // function updateStudent(indexEdit) {
    //     alert(indexEdit)
        
    //    studentArray[indexEdit].english = document.getElementById('english').value;
    //    studentArray[indexEdit].math = document.getElementById('math').value;
    //    studentArray[indexEdit].physics = document.getElementById('physics').value;
    //    studentArray[indexEdit].computer = document.getElementById('computer').value;
    //    studentArray[indexEdit].science = document.getElementById('science').value;
    //    document.getElementById('addStudent').value = 'Add';
    // //    getHandleValue('english', 'clear');
    // //    getHandleValue('math', 'clear');
    // //    getHandleValue('physics', 'clear');
    // //    getHandleValue('computer', 'clear');
    // //    getHandleValue('science', 'clear');

    // //if () {
    //     //display .value = "";

    //     //() = false;

    //     // updateCounter = -1;
    //    //document.getElementById('addStudent').removeEventListener('click',updateStudentFunction(-1));
    //    document.getElementById('addStudent').addEventListener('click',addStudent);
    //    renderStudentList();
    // }


    function renderStudentList() {
        let studentList = document.getElementById('studentList');
        studentList.innerHTML = '';
        for (studentIndex =0; studentIndex < studentArray.length; studentIndex++) {

            //console.log(studentArray[studentIndex].studentID)
            studentList.innerHTML = studentList.innerHTML + 
                 renderUI(studentArray[studentIndex].studentID,
                          studentArray[studentIndex].english,
                          studentArray[studentIndex].math,
                          studentArray[studentIndex].physics, 
                          studentArray[studentIndex].computer,
                          studentArray[studentIndex].science);

        }
    }
    
    
    // one form when you just need to call a function
    //studentList.addEventListener('click', myButtons);
    // second form when you pass a param 
    studentList.addEventListener('click', (event) => { // "event" here is the event parameter
        const clickedEvent = event.target;
        //console.log(clickedEvent.value);
        //console.log(clickedEvent);
        const parentNode = clickedEvent.parentNode;
        const studentID = parseInt(parentNode.id);
        if (clickedEvent.value === 'Delete') {
            // we are going to use splice to remove elements
            if (studentArray.length !== 0) {
                //const indexToDelete = studentID - 1;
                // find the student id
                let indexToDelete = -1;
                for (studentIndex =0; studentIndex < studentArray.length; studentIndex++) {
                    if (studentArray[studentIndex].studentID === studentID) {
                        indexToDelete = studentIndex;
                        break;
                    }
                }
                studentArray.splice(indexToDelete,1)
                renderStudentList()
            }

        }else if (clickedEvent.value === 'Update') {
            // need to add code here
            let indexToEdit = -1;
            for (studentIndex =0; studentIndex < studentArray.length; studentIndex++) {
                if (studentArray[studentIndex].studentID === studentID) {
                    indexToEdit = studentIndex;
                    break;
                }
            }

            // now have the index to update
            document.getElementById('addStudent').value = 'Update';
            // copy the data to form
            
            document.getElementById('english').value =studentArray[indexToEdit].english;
            document.getElementById('math').value=studentArray[indexToEdit].math;
            document.getElementById('physics').value=studentArray[indexToEdit].physics;
            document.getElementById('computer').value=studentArray[indexToEdit].computer;
            document.getElementById('science').value=studentArray[indexToEdit].science;

            
            document.getElementById('addStudent').removeEventListener('click',addStudent);
            document.getElementById('addStudent').addEventListener("click", someFunc = function updateFunction(){ 
                //alert(indexToEdit)
        
                studentArray[indexToEdit].english = document.getElementById('english').value;
                studentArray[indexToEdit].math = document.getElementById('math').value;
                studentArray[indexToEdit].physics = document.getElementById('physics').value;
                studentArray[indexToEdit].computer = document.getElementById('computer').value;
                studentArray[indexToEdit].science = document.getElementById('science').value;
                document.getElementById('addStudent').value = 'Add';
       
       document.getElementById('addStudent').removeEventListener('click', someFunc);
       document.getElementById('addStudent').addEventListener('click',addStudent);
       renderStudentList();
             
            
            });
            
            
            console.log('before' + indexToEdit);
            // updateCounter = indexToEdit;
            


            //HELPPPPP

        }
        // else {
        //     alert('button is not supported')
        // }

    
    })
