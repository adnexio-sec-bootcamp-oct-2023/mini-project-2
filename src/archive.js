//creating menu display
let menuDisplay = 
`Welcome to the Task Manager Application!
=========================================
    1. View tasks
    2. Create a new task
    3. Search for a task
    4. Edit a task
    5. Delete a task
    6. Exit`;

//repeating home or exit app message
let homeOrExit =`Enter 1 to go home, Enter 0 to exit`

//import
const readline = require('readline');
const { viewTask, writeNewTask }= require('./function.js')

//
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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
        rl.close();
    }
}

main();

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}



