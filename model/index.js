const fs = require("fs/promises");
const path = require("path");

const contacts = require("./contacts.json");
const filePath = path.join(__dirname, "contacts.json");

// import { customAlphabet } from "nanoid";
// const nanoid = customAlphabet("1234567890abcdef", 10);
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) => {
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

const removeContact = async (contactId) => {
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  const removeContacts = contacts[contactIdx];
  if (!contactIdx) {
    return null;
  }
  contacts.splice(contactIdx, 1);
  await updateContacts(contacts);
  return removeContacts;
};

const addContact = async (body) => {
  const id = nanoid();
  const newContact = { id, ...body };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (!contactIdx) {
    return null;
  }
  contacts[contactIdx] = { id, ...body };
  await updateContacts(contacts);
  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
