const fs = require('fs');
const path = require('path');

const { listContacts,
  getContactById,
  removeContact,
  addContact } = require('./contacts');
  
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
  
// console.log(__filename);
// console.log(__dirname);
// console.log(process.argv);

// listContacts();
// getContactById('77173');
// addContact('My Name', 'my_email@mail.com', '(123) 456-7890');
// removeContact('681');
