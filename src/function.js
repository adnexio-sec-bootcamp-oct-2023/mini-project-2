//import
const { writeJSONFile, readJSONFile }= require('./utils/storage.js')

//View task
function viewTask (){
    readJSONFile('./data/task.json', (err, data) => {
        if (err) {
          console.error('Error reading the JSON file:', err);
        } else {
          console.log(data);
        }
      })
}

function writeNewTask(data){
    
writeJSONFile('./data/task.json', data, (err) => {
  if (err) {
    console.error('Error writing to the JSON file:', err);
  } else {
    console.log('Data has been written to data.json');
  }
});
}


module.exports ={
    viewTask,
    writeNewTask
}