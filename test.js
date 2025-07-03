// export class DeletionManager {
//     constructor() {
//         this.selectedTasks = new Set();
//         this.taskToDelete;
//         this.selectionBar = document.querySelector('.selection-bar');
//         this.setupSelectionHandlers();
//         this.setupDelete();
//         this.isSelectionMode = false;
//     }

//     // Unable to understand why do we need this here now.
//     setupSelectionHandlers() {
//         const select_all_btn = document.querySelector('.select-all-btn');
//         select_all_btn.addEventListener("click", () => this.handleSelectAll());

//         const cancel_selection_btn = document.querySelector('.cancel-selection-btn');
//         cancel_selection_btn.addEventListener("click", () => this.handleCancelSelection());
//     }


//     setupDelete() {
//         const deleteModal = document.getElementById("delete-modal");
//         const deleteButton = deleteModal.querySelector(".modal-delete-btn");
//         const cancelButton = deleteModal.querySelector(".modal-cancel-btn");
//         const deleteModalHeader = deleteModal.querySelector(".delete-modal-header");
//         const deleteModalBody = deleteModal.querySelector(".delete-modal-body");

//         // Creating a helper function 
//         // This function is handling dynamic heading and body content of a delete modal.
//         const updateModalContent = (taskIds) => {
//             const taskIdsArray = Array.from(taskIds);
//             let modalHeading = document.getElementById("delete-modal-heading");
//             if (!modalHeading) {
//                 const h1 = document.createElement('h1');
//                 // h1.className = 'delete-modal-heading';
//                 h1.id = "delete-modal-heading";
//                 deleteModalHeader.appendChild(h1);
//                 modalHeading = h1;
//             }

//             // Delete modal body content
//             let modalBodyContent = document.getElementById("delete-modal-content");
//             if (!modalBodyContent){
//                 const h2 = document.createElement('h2');
//                 h2.id = "delete-modal-content"
//                 deleteModalBody.appendChild(h2);
//                 modalBodyContent = h2;
//             }


//             if (taskIdsArray.length === 1) {
//                 // For one task, but here we are deleting from selection bar delete button, not from delete icon.
//                 modalHeading.textContent = `Delete ${taskIdsArray.length} task?`;
//                 modalBodyContent.textContent = "Are you sure you want to delete this task?"

//             }
//             else {
//                 modalHeading.textContent = `Delete ${taskIdsArray.length} tasks?`;
//                 modalBodyContent.textContent = "Are you sure you want to permanently delete these tasks? This cannot be undone."

//             }
//         };

//         // Bulk delete from selection bar
//         this.selectionBar.addEventListener('click', (event) => {
//             // Basically clicked on the delete button in the selection bar.
//             if (event.target.classList.contains('delete-selected-btn')) {
//                 // It means that atleast on of the checkbox is selected.
//                 if (this.selectedTasks.size != 0) {
//                     updateModalContent(this.selectedTasks);
//                     // Selected taskId set for bulk delete.
//                     this.taskToDelete = this.selectedTasks;
//                     deleteModal.style.display = "block";
//                 }
//             }
//         });

//         // Individual delete from icon click
//         document.querySelector("#task-display").addEventListener("click", (event) => {
//             const deleteIcon = event.target.closest('.delete-icon');
//             console.log("deleteIcon is ",deleteIcon);
//             if (deleteIcon) {
//                 console.log("I am here because of delete icon.");
//                 const taskId = deleteIcon.getAttribute("data-task-id");
//                 console.log("taskId from delete icon", taskId);
//                 const taskIdToDelete = new Set([taskId]);
//                 console.log("taskId to delete is ",taskIdToDelete);
//                 updateModalContent(taskIdToDelete);

//                 // Setting single taskId set for individual delete.
//                 this.taskToDelete = taskIdToDelete;
//                 const delete_modal_heading = document.getElementById("delete-modal-heading");
//                 delete_modal_heading.textContent = "Delete Task ?";
//                 deleteModal.style.display = "block";

//             }
//         });

//         // This is for setting correct taskIds to set based on individual tasks or bulk tasks.
//         // Fetching task_id for single task.

//         deleteButton.addEventListener("click", () => {
            
//             // *** I didn't get what this line of code means, or what it is suppose to do?
//             // const taskIdsToDelete = this.selectedTasks.size > 0 ? this.selectedTasks : new Set([document.querySelector('.delete-icon[data-task-id]').dataset.task_id]);
//             // handleDeleteAction(taskIdsToDelete);
//             console.log("Task ids to delete", this.taskToDelete);
//             document.dispatchEvent(new CustomEvent("deleteTasks", {detail: {taskIds: this.taskToDelete}}));

//         });

//         cancelButton.addEventListener("click", () => {
//             deleteModal.style.display = "none";
//         });
//     }

//     clearSelectionState() {
//         // Clearing the set of taskIds(which were marked checked earlier.)
//         this.selectedTasks.clear();
//         const checkboxes = document.querySelectorAll(".task-checkbox:checked");
//         // For proper cleanup or clearing the selection state, we need to mark all the checked checkboxes to false.
//         checkboxes.forEach(checkbox => {
//             checkbox.checked = false;
//         });

//         this.selectionBar.style.display = 'none';
//         this.isSelectionMode = false;
//         this.hideAllCheckboxes();
//     }

//     showAllCheckboxes() {
//         // Enable selection mode
//         // For showing all unchecked checkboxes, when one checkbox is marked.
//         document.body.classList.add("selection-mode");
//         const taskCards = document.querySelectorAll('.task-card');

//         // Showing checkboxes for all tasks.
//         taskCards.forEach(card => {
//             card.classList.add("selection-active");  
//             console.log("Added .selection-active to:", card);
//             // const selectionArea = card.querySelector('.task-selection');
//             // selectionArea.style.display = 'flex';
//         });
//         this.isSelectionMode = true;
//     }

//     hideAllCheckboxes() {
//         if (this.selectedTasks.size === 0) {
//             // Disable selection mode.
//             document.body.classList.remove("selection-mode");
//             console.log("Hiding all checkboxes...");
//             const taskCards = document.querySelectorAll('.task-card');
//             taskCards.forEach(card => {
//                 // const selectionArea = card.querySelector('.task-selection');
//                 // selectionArea.style.display = 'none';
//                 card.classList.remove("selection-active");
//             });
//             this.isSelectionMode = false;
//         }
//     }

//     handleCheckboxChange(event) {
//         event.stopPropagation(); // Stop event from bubbling up to task card.
//         const taskId = event.target.getAttribute('data-task-id');
//         console.log("taskId initially is ", taskId);
//         console.log("Selected tasks after change:", this.selectedTasks);
//         console.log("Selection bar display:", this.selectionBar.style.display);

//         if (event.target.checked) {
//             this.selectedTasks.add(taskId);
//             console.log("selectedTasks is ", this.selectedTasks);
//             this.showAllCheckboxes();
//         }
//         else {
//             if (this.selectedTasks.size !==0){
//                 this.selectedTasks.delete(taskId);
//             }
//             // this.selectedTasks.delete(taskId);
//             console.log("selectedTasks is ", this.selectedTasks);
//             if (this.selectedTasks.size === 0) {
//                 this.hideAllCheckboxes();
//             }
//         }
//         // Basically the count of selected tasks.
//         setTimeout(() => this.updateSelectionBar(),0);
//         // this.updateSelectionBar();
//     }

//     // Handling bulk select.
//     handleSelectAll() {
//         // This checkbox container is associated with each task card, therefore we can just select all check box by selecting the checkboxes, rather than first going to all the task cards, adding checkbox and marking them(checked them.).
//         const checkboxes = document.querySelectorAll('.task-checkbox');
//         checkboxes.forEach(checkbox => {
//             checkbox.checked = true;
//             // Adding all the task
//             this.selectedTasks.add(checkbox.getAttribute('data-task-id'));
//         });
//         this.updateSelectionBar();

//     }

//     // Cancelling bulk selection.
//     handleCancelSelection() {
//         // Here we are not manually hiding the selection bar, we are just deselecting all the tasks, by removing all the task-ids from our selectedTasks set(which is for deleted tasks having task-ids present in set.) and here we are calling updateSelectionBar which will handle this hiding feature by itself.
//         this.selectedTasks.clear();
//         const checkboxes = document.querySelectorAll('.task-checkbox');
//         checkboxes.forEach(checkbox => {
//             checkbox.checked = false;
//         });
//         // this.hideAllCheckboxes();
//         this.updateSelectionBar();
//     }

//     // Showing and hiding the selection bar.
//     updateSelectionBar() {
//         console.log("Updating selection bar, selected tasks:", this.selectedTasks);

//         if (this.selectedTasks.size > 0) {
//             console.log("Showing selection bar...");
//             this.selectionBar.style.display = 'flex';
//             this.selectionBar.querySelector('.selected-count').textContent =
//                 `${this.selectedTasks.size} selected`;
//         }
//         else {
//             console.log("Hiding selection bar.");
//             this.selectionBar.style.display = 'none';
//         }
//     }

//     // Basically handling the change, whether checkbox is marked or not.
//     setupTaskCheckboxes() {
//         const checkboxes = document.querySelectorAll('.task-checkbox');
//         checkboxes.forEach(checkbox => {
//             // Remove existing listeneres to prevent duplicates
//             // checkbox.removeEventListener('change', (e) => this.handleCheckboxChange(e));

//             // Add new listener
//             checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e));

//             console.log("Attached event listener to checkbox:", checkbox.getAttribute("data-task-id"));
//         });
//     }
// }

// ################# Testing ########
// Variables to track view mode
let currentViewMode = "card"; // "card" or "list"

// Function to toggle between card and list views
function toggleTaskView() {
    const viewAllButton = document.querySelector(".view-all-button");
    
    // Toggle the view mode
    currentViewMode = currentViewMode === "card" ? "list" : "card";
    
    // Update button text
    viewAllButton.textContent = currentViewMode === "card" ? "View All Tasks" : "Dashboard";
    
    // Re-render tasks with new view mode
    displayTasks(currentUser, currentUser.taskList, "", currentViewMode);
}

// Initialize the view toggle button
function initViewToggle() {
    const viewAllButton = document.querySelector(".view-all-button");
    if (viewAllButton) {
        viewAllButton.addEventListener("click", toggleTaskView);
    }
}

// Call this function when your app initializes
function initializeApp() {
    // Your existing initialization code...
    
    // Initialize view toggle
    initViewToggle();
}

// Modified displayTasks function to handle both card and list views
async function displayTasks(user, current_task_ls, message = "", viewMode = "card") {
    console.log("user_task_ls inside displayTasks func. ", current_task_ls);
    console.log("I am inside displayTasks function. View mode: ", viewMode);
    
    const taskDisplay = document.querySelector("#task-display");
    let user_task_ls = current_task_ls;
    
    if (message) {
        taskDisplay.innerHTML = `<div class="no-tasks-container"><p class="no-tasks-message">${message}</p></div>`;
        return;
    }
    
    // Clear the display area and set appropriate container based on view mode
    if (viewMode === "card") {
        // CARD VIEW (your existing implementation)
        taskDisplay.innerHTML = '<div class="task-container"></div>';
        const cardContainer = taskDisplay.querySelector('.task-container');
        
        for (const task of user_task_ls) {
            const taskCard = document.createElement("div");
            taskCard.className = "task-card";
            taskCard.dataset.taskId = task.task_id;
            taskCard.id = `task-${task.task_id}`;
            
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();
            const hasReminder = await checkExistingNotification(task.task_id);
            
            const bellButtonHTML = `
                <button class="reminder-button" id="reminder-btn-${task.task_id}" data-task-id="${task.task_id}" data-reminder-set="${hasReminder}">
                    ${getBellIconHTML(hasReminder, task.dueDate)}
                </button>`;
                
            taskCard.innerHTML = `
                <div class="task-selection">
                    <div class="task-checkbox-wrapper">
                        <input type="checkbox" class="task-checkbox" data-task-id="${task.task_id}">
                        <div class="checkbox-custom"></div>
                    </div>
                    <i class="material-icons delete-icon" data-task-id="${task.task_id}">delete</i>
                </div>
                <div class="card-header">
                    <h3 class="task-title">${task.task}</h3>
                    <div class="status-priority">
                        <div class="status-badge" data-status="${task.status.toLowerCase()}">${getStatusEmoji(task.status)}</div>
                        <div class="priority-flag" data-priority="${task.priority.toLowerCase()}">
                            <span>${getPriorityEmoji(task.priority)}</span>
                            <span>${capitalize(task.priority)}</span>
                        </div>
                    </div>
                </div>
                <div class="tags-container"> </div>
                <div class="card-footer">
                    <button class="tag-button" id="tag-btn-${task.task_id}" data-task-id="${task.task_id}">
                        <span>Add Tag</span>
                    </button>
                     ${bellButtonHTML}
                </div> `;
                
            cardContainer.appendChild(taskCard);
            updateTaskCardTags(task, userListKey, userMap);
        }
    } else {
        // LIST VIEW (new implementation)
        taskDisplay.innerHTML = '<div class="task-list-container"></div>';
        const listContainer = taskDisplay.querySelector('.task-list-container');
        
        // Add header for selection when tasks are present
        if (user_task_ls.length > 0) {
            const listHeader = document.createElement("div");
            listHeader.className = "task-list-header";
            listHeader.innerHTML = `
                <div class="task-selection-header">
                    <div class="task-checkbox-wrapper">
                        <input type="checkbox" id="select-all-tasks" class="select-all-checkbox">
                        <div class="checkbox-custom"></div>
                    </div>
                </div>
                <span class="task-count">${user_task_ls.length} tasks</span>
            `;
            listContainer.appendChild(listHeader);
        }
        
        // Render each task as a list item
        for (const task of user_task_ls) {
            const taskListItem = document.createElement("div");
            taskListItem.className = "task-list-item";
            taskListItem.dataset.taskId = task.task_id;
            taskListItem.id = `task-${task.task_id}`;
            
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();
            
            taskListItem.innerHTML = `
                <div class="task-selection">
                    <div class="task-checkbox-wrapper">
                        <input type="checkbox" class="task-checkbox" data-task-id="${task.task_id}">
                        <div class="checkbox-custom"></div>
                    </div>
                    <i class="material-icons delete-icon" data-task-id="${task.task_id}">delete</i>
                </div>
                <div class="task-list-content">
                    <div class="task-list-primary">
                        <span class="task-list-title">${task.task}</span>
                        <div class="task-list-indicators">
                            <div class="status-badge" data-status="${task.status.toLowerCase()}">${getStatusEmoji(task.status)}</div>
                            <div class="priority-flag" data-priority="${task.priority.toLowerCase()}">
                                <span>${getPriorityEmoji(task.priority)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="task-list-secondary">
                        <span class="task-list-date">${formattedDate}</span>
                    </div>
                </div>
            `;
            
            listContainer.appendChild(taskListItem);
        }
    }
    
    // Set up hover effects for interactive elements
    document.querySelectorAll('.tag-button, .reminder-button, .task-tag').forEach(element => {
        element.addEventListener('mouseenter', function () {
            const taskCard = this.closest('.task-card');
            if (taskCard) {
                taskCard.classList.add('interactive-hover');
            }
        });
        element.addEventListener('mouseleave', function () {
            const taskCard = this.closest('.task-card');
            if (taskCard) {
                taskCard.classList.remove('interactive-hover');
            }
        });
    });
    
    // Set up similar hover effects for list items
    document.querySelectorAll('.task-list-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('task-list-item-hover');
            const checkboxWrapper = this.querySelector('.task-checkbox-wrapper');
            const deleteIcon = this.querySelector('.delete-icon');
            if (checkboxWrapper) checkboxWrapper.style.visibility = 'visible';
            if (deleteIcon) deleteIcon.style.visibility = 'visible';
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('task-list-item-hover');
            const checkboxWrapper = this.querySelector('.task-checkbox-wrapper');
            const deleteIcon = this.querySelector('.delete-icon');
            if (checkboxWrapper) checkboxWrapper.style.visibility = 'hidden';
            if (deleteIcon) deleteIcon.style.visibility = 'hidden';
        });
    });

    // Event handler for task display (shared between views)
    function handleTaskDisplayClick(event) {
        if (viewMode === "card") {
            // Card view event handling (your existing code)
            if (!event.target.closest('.task-card')) return;
            
            if (event.target.matches('.tag-button') || event.target.closest('.tag-button')) {
                // Tag button handling
                event.stopPropagation();
                const taskCard = event.target.closest('.task-card');
                const taskId = taskCard.dataset.taskId;
                console.log("Tag button clicked for task: ", taskId);
                
                const tagModal = document.getElementById('tag-modal');
                tagModal.dataset.taskid = taskId;
                tagModal.style.display = 'block';
                tagHandler(userListKey, userMap, currentUser, predefinedTags, tagModal);
                return;
            }
            
            if (event.target.matches('.reminder-button') || event.target.closest('.reminder-button')) {
                // Reminder button handling
                event.stopPropagation();
                const taskId = event.target.closest('.task-card').dataset.taskId;
                const task = currentUser.taskList.find(t => t.task_id === taskId);
                if (!task.dueDate) {
                    return;
                }
                currentReminderTaskId = taskId;
                showReminderModal(taskId);
                
                const setReminderBtn = document.getElementById('set-reminder-btn');
                if (setReminderBtn) {
                    setReminderBtn.removeEventListener('click', handleSetReminderButtonClick);
                    setReminderBtn.addEventListener('click', handleSetReminderButtonClick);
                }
                return;
            }
            
            if (event.target.closest('.task-card') &&
                !event.target.matches('task-checkbox') &&
                !event.target.closest('.task-checkbox') &&
                !event.target.matches('.delete-icon') &&
                !event.target.closest('.delete-icon')) {
                // Task card click handling
                const taskCard = event.target.closest('.task-card');
                const taskId = taskCard.dataset.taskId;
                openEditModal(taskId, current_task_ls);
            }
        } else {
            // List view event handling
            if (!event.target.closest('.task-list-item') && !event.target.closest('.task-list-header')) return;
            
            // Handle select all checkbox
            if (event.target.matches('#select-all-tasks') || event.target.closest('#select-all-tasks')) {
                const selectAllCheckbox = document.getElementById('select-all-tasks');
                const allCheckboxes = document.querySelectorAll('.task-list-item .task-checkbox');
                
                allCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAllCheckbox.checked;
                });
                
                updateBulkActionDisplay();
                return;
            }
            
            // Handle individual task checkbox
            if (event.target.matches('.task-checkbox') || event.target.closest('.task-checkbox')) {
                updateBulkActionDisplay();
                return;
            }
            
            // Handle delete icon
            if (event.target.matches('.delete-icon') || event.target.closest('.delete-icon')) {
                event.stopPropagation();
                const taskId = event.target.closest('.task-list-item').dataset.taskId;
                handleTaskDeletion(taskId);
                return;
            }
            
            // Handle task item click (open edit modal)
            if (event.target.closest('.task-list-item') &&
                !event.target.matches('.task-checkbox') &&
                !event.target.closest('.task-checkbox') &&
                !event.target.matches('.delete-icon') &&
                !event.target.closest('.delete-icon')) {
                
                const taskItem = event.target.closest('.task-list-item');
                const taskId = taskItem.dataset.taskId;
                openEditModal(taskId, current_task_ls);
            }
        }
    }
    
    // Helper function to open edit modal (shared between views)
    function openEditModal(taskId, taskList) {
        console.log("Task clicked, opening edit modal", taskId);
        document.getElementById("modal-title").textContent = "Update Task";
        isEditMode = true;
        editTaskId = taskId;
        const task = taskList.find(t => t.task_id === taskId);
        console.log("task is ", task);
        populateModalForm(task);
        modal.style.display = "block";
    }
    
    // Helper function to handle task deletion (shared between views)
    function handleTaskDeletion(taskId) {
        // Your existing delete logic
        console.log("Delete clicked for task:", taskId);
        
        // Add your confirmation dialog or direct deletion code here
        if (confirm("Are you sure you want to delete this task?")) {
            // Delete logic
            const taskIndex = currentUser.taskList.findIndex(t => t.task_id === taskId);
            if (taskIndex !== -1) {
                currentUser.taskList.splice(taskIndex, 1);
                updateUserData(currentUser, userMap, userListKey);
                displayTasks(currentUser, currentUser.taskList, "", currentViewMode);
            }
        }
    }
    
    // Helper function to update the bulk action display
    function updateBulkActionDisplay() {
        const checkedBoxes = document.querySelectorAll('.task-list-item .task-checkbox:checked, .task-card .task-checkbox:checked');
        const bulkActionBar = document.querySelector('.bulk-action-bar') || createBulkActionBar();
        
        if (checkedBoxes.length > 0) {
            bulkActionBar.querySelector('.selected-count').textContent = `${checkedBoxes.length} selected`;
            bulkActionBar.style.display = 'flex';
        } else {
            bulkActionBar.style.display = 'none';
        }
    }
    
    // Helper function to create the bulk action bar if it doesn't exist
    function createBulkActionBar() {
        const existingBar = document.querySelector('.bulk-action-bar');
        if (existingBar) return existingBar;
        
        const bulkActionBar = document.createElement('div');
        bulkActionBar.className = 'bulk-action-bar';
        bulkActionBar.innerHTML = `
            <span class="selected-count">0 selected</span>
            <div class="bulk-actions">
                <button class="bulk-action-btn select-all-btn">Select all</button>
                <button class="bulk-action-btn cancel-btn">Cancel</button>
                <button class="bulk-action-btn delete-btn">Delete Selected</button>
            </div>
        `;
        
        // Insert at the top of task display
        const taskDisplay = document.getElementById('task-display');
        taskDisplay.insertBefore(bulkActionBar, taskDisplay.firstChild);
        
        // Set up event listeners for bulk action buttons
        bulkActionBar.querySelector('.select-all-btn').addEventListener('click', () => {
            const allCheckboxes = document.querySelectorAll('.task-checkbox');
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            updateBulkActionDisplay();
        });
        
        bulkActionBar.querySelector('.cancel-btn').addEventListener('click', () => {
            const allCheckboxes = document.querySelectorAll('.task-checkbox');
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateBulkActionDisplay();
        });
        
        bulkActionBar.querySelector('.delete-btn').addEventListener('click', () => {
            const checkedBoxes = document.querySelectorAll('.task-checkbox:checked');
            const taskIds = Array.from(checkedBoxes).map(box => box.dataset.taskId);
            
            if (confirm(`Are you sure you want to delete ${taskIds.length} tasks?`)) {
                // Delete selected tasks
                currentUser.taskList = currentUser.taskList.filter(task => !taskIds.includes(task.task_id));
                updateUserData(currentUser, userMap, userListKey);
                displayTasks(currentUser, currentUser.taskList, "", currentViewMode);
            }
        });
        
        return bulkActionBar;
    }
    
    // Attach the event listener to the task display
    taskDisplay.removeEventListener("click", handleTaskDisplayClick);
    taskDisplay.addEventListener("click", handleTaskDisplayClick);
}