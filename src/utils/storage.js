
const fs = require('fs');

// Function to read data from a JSON file
function readJSONFile(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

// Function to write data to a JSON file
function writeJSONFile(filename, data, callback) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile(filename, jsonData, 'utf8', (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = {
  writeJSONFile,
  readJSONFile
};
/*
// Example usage:
// To read data from a JSON file:

JSONreader('project-root/mini-project2/src/data/task.json', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
  } else {
    console.log('Read data:', data);
  }
});
*/

// To write data to a JSON file:
/*
const data = { name: 'John', age: 30, city: 'New York' };
writeJSONFile('project-root/mini-project2/src/data/task.json', data, (err) => {
  if (err) {
    console.error('Error writing to the JSON file:', err);
  } else {
    console.log('Data has been written to data.json');
  }
});*/