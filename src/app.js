// Import functions from function.js
const { viewTask, writeNewTask, searchTask, editTask, deleteTask, setRLInstance } = require('./function.js');

// Creating menu display
const menuDisplay = `
Welcome to the Task Manager Application!
=========================================
    1. View tasks
    2. Create a new task
    3. Search for a task
    4. Edit a task
    5. Delete a task
    6. Exit
=========================================
`;

// Repeating home or exit app message
const homeOrExit = `Enter 1 to go home, Enter 0 to exit`;

// Import readline module
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//export readline to function.js
setRLInstance(rl);

//main function
async function main() {
    try {
        console.log(menuDisplay);
        const command = await askQuestion('Enter your choice:');

        switch (command) {
            case '1':
                viewTask();
                break;
            case '2':
                const title = await askQuestion('Enter Title: ');
                const description = await askQuestion('Enter Task: ');
                const currentTime = new Date();
                const formattedTime = currentTime.toLocaleTimeString();
                const formattedDate = currentTime.toLocaleDateString();
                const newTask = { title, description, time:formattedTime, date:formattedDate };
                await writeNewTask(newTask);
                break;
            case '3':
                const keyword = await askQuestion('Enter keyword to search: ');
                searchTask(keyword);
                break;
            case '4':
                await viewTask();
                await editTask();
                break;
            case '5':
                await viewTask();
                await deleteTask();
                break;
            case '6':
                console.log('Thank you for using Task Manager. Goodbye!');
                return rl.close();
            default:
                console.warn('Error: Invalid input. Re-enter 1-5:');
                break;
        }

        // Repeat or exit
        console.log(`${homeOrExit} :`);
        const repeat = await askQuestion('');
        if (repeat === '1') {
            await main();
        } else {
            rl.close();
        }
    } catch (error) {
        console.log('An error occurred: ', error);
    } finally {
        rl.close();
    }
}

//call the main function
main();

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

/*
change if else statement to switch case statement
async function main() {
    try {
        console.log(menuDisplay)
        const command = await askQuestion('Enter your choice:');

        if (!/[1-6]/.test(command)){
                console.warn('Error: Invalid input. Re-enter 1-6:')
                 await main();
        } else if(command === '1') {
                viewTask();
                await main();
        } else if (command === '2') {
                const title= await askQuestion('Enter Title: ');
                const task = await askQuestion('Enter Task: ');
                await writeNewTask({title: title, task: task}); 
                main();
        } else if(command === '6') {
                 return rl.close()
        } else if(command === '1') {
            viewTask();
            await main();
      } 



    } catch (error) {
        console.log('An error occured: ', error)
    } finally {
   */