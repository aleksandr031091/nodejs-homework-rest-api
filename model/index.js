const fs = require("fs/promises");
const path = require("path");

const contacts = require("./contacts.json");
const filePath = path.join(__dirname, "products.json");
const { nanoid } = require("nanoid");

const updateContacts = async (newProducts) => {
  await fs.writeFile(filePath, JSON.stringify(newProducts));
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
  // const id = nanoid();
  // const newContact = { ...body, id: id };
  // contacts.push(newContact);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
