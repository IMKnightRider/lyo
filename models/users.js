const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function getUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

module.exports = {
  getUsers,
  saveUsers
};
