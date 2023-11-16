// import
const { writeJSONFile, readJSONFile } = require('./utils/storage.js');

let rlInstance; // Declare rlInstance globally to store the readline interface

// Set the rl instance
function setRLInstance(rl) {
    rlInstance = rl;
}

//define the array to be empty and the data will insert into correct format inside here
data = [];

// View task
function viewTask() {
    readJSONFile('./data/task.json', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
        } else {
            //Display task information with the index to make it a structure way.
            console.log('Tasks:');
            data.forEach((task, index) => {
                console.log(`${index + 1}. Title: ${task.title} | Description: ${task.description}\n   Date: ${task.date} | Time: ${task.time}`);
            });
        }
    });
}

// Write new task
async function writeNewTask(newTask) {
    //before writing a task, need to check the data in json first
    readJSONFile('./data/task.json', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
        } else {
            //add new task to the data array
            data.push(newTask);
            //write the update data back to the json file
            writeJSONFile('./data/task.json', data, (err) => {
                if (err) {
                    console.error('Error writing to the JSON file:', err);
                } else {
                    console.log('Data has been written to data.json');
                }
            });
        }
    });
}

// Search task
function searchTask(keyword) {
    readJSONFile('./data/task.json', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
        } else {
            //filter task based on keyword
            const results = data.filter(task =>
                task.title.toLowerCase().includes(keyword.toLowerCase()) ||
                task.description.toLowerCase().includes(keyword.toLowerCase())
            );
            //display matching task
            if (results.length === 0) {
                console.log('No matching tasks found.');
            } else {
                console.log('Matching tasks:');
                results.forEach((task, index) => {
                    console.log(`${index + 1}. Title: ${task.title} | Description: ${task.description}`);
                });
            }
        }
    });
}

// Edit task
async function editTask() {
    try {
        const data = await new Promise((resolve) => {
            readJSONFile('./data/task.json', (err, data) => {
                if (err) {
                    console.error('Error reading the JSON file:', err);
                    resolve([]);
                } else {
                    resolve(data);
                }
            });
        });
        //ask the user index they want to edit
        const indexToEdit = await askQuestion('Enter the index of the task to edit (0 to cancel): ');
        //if the user put 0, then the operation is canceled
        if (indexToEdit === '0') {
            console.log('Edit operation canceled.');
            rlInstance.close();
            return;
        }
        // Get the task to edit based on the index
        const taskToEdit = data[indexToEdit - 1];

        if (!taskToEdit) {
            console.log('Invalid index. No task found to edit.');
            rlInstance.close();
            return;
        }

        // Provide options for editing
        const options = `
            Choose what to edit:
            1. Title
            2. Description
            3. Both Title and Description
        `;

        console.log(options);
        // Ask the user for their choice
        const choice = await askQuestion('Enter your choice: ');
        switch (choice) {
            case '1':
                //update title
                const newTitle = await askQuestion('Enter new title: ');
                taskToEdit.title = newTitle;
                break;
            case '2':
                //update description
                const newDescription = await askQuestion('Enter new description: ');
                taskToEdit.description = newDescription;
                break;
            case '3':
                //update for title and description
                const newTitleBoth = await askQuestion('Enter new title: ');
                const newDescriptionBoth = await askQuestion('Enter new description: ');
                taskToEdit.title = newTitleBoth;
                taskToEdit.description = newDescriptionBoth;
                break;
            default:
                console.log('Invalid choice. No changes made.');
                break;
        }

        // Write the updated data back to the file
        await new Promise((resolve) => {
            writeJSONFile('./data/task.json', data, (err) => {
                if (err) {
                    console.error('Error writing to the JSON file:', err);
                } else {
                    console.log('Task successfully edited.');
                }
                resolve();
            });
        });
    }finally{
        rlInstance.close; //close readline for user choice to edit
    }
}

//delete task
async function deleteTask() {
    try {
        const data = await new Promise((resolve) => {
            readJSONFile('./data/task.json', (err, data) => {
                if (err) {
                    console.error('Error reading the JSON file:', err);
                    resolve([]);
                } else {
                    resolve(data);
                }
            });
        });
        // Ask the user for the index of the task to delete
        const indexToDelete = await askQuestion('Enter the index of the task to delete (0 to cancel): ');
        if (indexToDelete === '0') {
            console.log('Delete operation canceled.');
            rlInstance.close();
            return;
        }
        const taskToDelete = data[indexToDelete - 1];
        if (!taskToDelete) {
            console.log('Invalid index. No task found to edit.');
            rlInstance.close();
            return;
        }
        //display the task to be delete
        console.log(`Task to delete: ${taskToDelete.title} | Description: ${taskToDelete.description}`);
        // Ask for confirmation
        const confirmation = await askQuestion('Are you sure you want to delete this task? (yes/no): ');
        //user type other than yes will canceled the operation
        if (confirmation.toLowerCase() !== 'yes') {
            console.log('Delete operation canceled.');
            rlInstance.close();
            return;
        }else {
            data.splice(indexToDelete - 1, 1);
            await new Promise((resolve) => {
                writeJSONFile('./data/task.json', data, (err) => {
                    if (err) {
                        console.error('Error writing to the JSON file:', err);
                    } else {
                        console.log('Task successfully deleted.');
                    }
                    resolve();
                });
            });
        }

    }finally{
        rlInstance.close;   //close readline
    }
}

// Export functions
module.exports = {
    viewTask,
    writeNewTask,
    searchTask,
    editTask,
    deleteTask,
    setRLInstance
};

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
      // Check if the readline interface is still open
      if (rlInstance.closed) {
          console.error('Readline interface is closed.');
          resolve(''); // Resolve with an empty string or an appropriate value
      } else {
          rlInstance.question(question, resolve);
      }
  });
}