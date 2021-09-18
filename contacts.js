// const fs = require('fs').promises;
const fs = require('fs/promises');

const path = require('path');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 5);

// const contactsPath = path.resolve('./db/contacts.json');
const contactsPath = path.join(__dirname, './db/contacts.json');

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
  // const fileData = await fs.readFile(contactsPath, 'utf-8');
  // const parsedData = JSON.parse(fileData);
  const parsedData = await readDataFromFile(contactsPath);
  if (parsedData) console.table(parsedData);
};

async function getContactById(contactId) {
  // const fileData = await fs.readFile(contactsPath, 'utf-8');
  // const parsedData = JSON.parse(fileData);
  const parsedData = await readDataFromFile(contactsPath);
  if (parsedData) {
    const contactData = parsedData.find(contact => contact.id === parseInt(contactId));
    if (contactData) {
      console.table(contactData);
    } else {
      console.error(`Contact with id ${contactId} not found.`);
    };
  };
};

async function removeContact(contactId) {
  // const fileData = await fs.readFile(contactsPath, 'utf-8');
  // let parsedData = JSON.parse(fileData);
  let parsedData = await readDataFromFile(contactsPath);
  if (parsedData) {
    if (parsedData.some(contactData => contactData.id === parseInt(contactId))) {
      // console.log(`Contact with id ${contactId} found.`)
      parsedData = parsedData.filter(contactData => contactData.id !== parseInt(contactId));
      if (writeDataToFile(contactsPath, parsedData)) {
        console.error(`Contact with id ${contactId} has been successfully removed.`);
      } else {
        console.error(`Contact with id ${contactId} couldn't be removed.`);
      };
      // await fs.writeFile(contactsPath, JSON.stringify(parsedData), 'utf-8');
    } else {
      console.error(`Contact with id ${contactId} not found.`);
    };
  };
};

async function addContact(name, email, phone) {
  const contactData = {id: parseInt(nanoid()), name, email, phone};
  // const fileData = await fs.readFile(contactsPath, 'utf-8');
  // const parsedData = JSON.parse(fileData);
  let parsedData = await readDataFromFile(contactsPath);
  if (parsedData) {
    parsedData.push(contactData);
    if (writeDataToFile(contactsPath, parsedData)) {
      console.error(`Contact ${name} has been successfully added.`);
    } else {
      console.error(`Contact ${name} couldn't be added.`);
    };
    // await fs.writeFile(contactsPath, JSON.stringify(parsedData), 'utf-8');
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};