const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContacts");
const upgateContactById = require("./updateContactById");
const removeContactById = require("./removeContact");
const upgateFavoritById = require("./updateFavoritById");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  upgateContactById,
  removeContactById,
  upgateFavoritById,
};
