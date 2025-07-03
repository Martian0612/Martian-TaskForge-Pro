// // Testing sorting function

// function sortTasks(sortBy) {
//     let sortFunc;

//     switch(sortBy) {
//         // We have array of objects like [{priority:"high", status:"in progress"}, {}.{},...]
//         // Earliest due Date to come
//         case "dueDate Earliest":
//             // function sortByDueDate() {

//             // };

//             // sortFunc = sortByDueDate();
//             sortFunc = (taskA, taskB) =>{
//                 const dateA = new Date(taskA.dueDate);
//                 const dateB = new Date(taskB.dueDate);
//                 return dateA - dateB;
//             };
//             break;

//         case "dueDate ":
//             sortFunc = (taskA, taskB) => {
//                 const dateA = new Date(taskA.dueDate);
//                 const dateB = new Date(taskB.dueDate);
//                 return dateB - dateA;
//             };
//             break;

//         case "priority":
//             // function sortByPriority() {

//             // };
//             // sortFunc = sortByPriority()

//             sortFunc = (taskA, taskB) =>{
//                 // pA === priorityA and pB === priorityB
//                 const pA = taskA.priority;
//                 const pB = taskB.priority;

//                 // *** This is suppose to implement high > medium > low. ***
//                 if ((pA === pB) || (pA === "high" && pB === "medium") || (pA === "medium" && pB === "low")){
//                     return pA;
//                 }
//                 else{
//                     return pB;
//                 } 
//             };
//             break;

//         case "status":
//             // function sortByStatus()  {

//             // };
//             // sortFunc = sortByStatus()
//             // 
//             sortFunc = (taskA, taskB) =>{
//                 // sA = StatusA and sB = StatusB
//                 const sA = taskA.status;
//                 const sB = taskB.status;

//                 if (pA === pB) {
//                     return 0;
//                 }
//                 else if ( (pA === "completed" && pB === "in progress") || (pA === "in progress" && pB === "not started")){
//                     return 1;
//                 }
//                 else {
//                     return -1;
//                 }
//             };
//             break;

//         default:
//             // Here don't wanna sort, so will just display.
//             sortFunc = "none";

//     };
//     return sortFunc;
// }

const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.includes('banana'));
console.log(fruits.includes('bana'));