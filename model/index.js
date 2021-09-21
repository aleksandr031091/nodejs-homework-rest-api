const fs = require("fs/promises");
const path = require("path");

const contacts = require("./contacts.json");
const filePath = path.join(__dirname, "contacts.json");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 10);

const updateContacts = async () => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async (body) => {
  const id = +nanoid();
  const newContact = { id, ...body };

  contacts.push(newContact);
  await updateContacts();
  return newContact;
};

const removeContact = async (contactId) => {
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  const removeContacts = contacts[contactIdx];

  if (contactIdx === -1) {
    return null;
  }
  contacts.splice(contactIdx, 1);
  await updateContacts();
  return removeContacts;
};

const updateContact = async (contactId, body) => {
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIdx === -1) {
    return null;
  }
  contacts[contactIdx] = { id: contactId, ...body };
  await updateContacts();
  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
