// const fs = require('fs').promises;
const fs = require('fs/promises');

const path = require('path');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 5);

// const contactsPath = path.resolve('./db/contacts.json');
const contactsPath = path.join(__dirname, 'db/contacts.json');

async function readDataFromFile(pathname) {
  try {
    const fileData = await fs.readFile(pathname, 'utf-8');
    return JSON.parse(fileData);
  }
  catch (error) {
    console.error(error.message);
    return false;
  };
};

async function writeDataToFile(pathname, data) {
  try {
    await fs.writeFile(pathname, JSON.stringify(data), 'utf-8');
    return true;
  }
  catch (error) {
    console.error(error.message);
    return false;
  };
};

async function listContacts() {
  const parsedData = await readDataFromFile(contactsPath);
  if (parsedData) console.table(parsedData);
};

async function getContactById(contactId) {
  const parsedData = await readDataFromFile(contactsPath);
  if (parsedData) {
    const contactIdInteger = parseInt(contactId);
    const contactData = parsedData.find(contact => contact.id === contactIdInteger);
    if (contactData) {
      console.table(contactData);
    } else {
      console.error(`Contact with id ${contactId} not found.`);
    };
  };
};

async function removeContact(contactId) {
  let parsedData = await readDataFromFile(contactsPath);
  if (parsedData) {
    const contactIdInteger = parseInt(contactId);
    if (parsedData.some(contactData => contactData.id === contactIdInteger)) {
      parsedData = parsedData.filter(contactData => contactData.id !== contactIdInteger);
      if (writeDataToFile(contactsPath, parsedData)) {
        console.error(`Contact with id ${contactId} has been successfully removed.`);
      } else {
        console.error(`Contact with id ${contactId} couldn't be removed.`);
      };
    } else {
      console.error(`Contact with id ${contactId} not found.`);
    };
  };
};

async function addContact(name, email, phone) {
  const contactData = {id: parseInt(nanoid()), name, email, phone};
  let parsedData = await readDataFromFile(contactsPath);
  if (parsedData) {
    parsedData.push(contactData);
    if (writeDataToFile(contactsPath, parsedData)) {
      console.error(`Contact ${name} has been successfully added.`);
    } else {
      console.error(`Contact ${name} couldn't be added.`);
    };
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};