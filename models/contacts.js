const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, 'utf-8');
		return JSON.parse(contacts);
	} catch (error) {
		return error;
	}
}

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const findContact = contacts.find((contact)=> contact.id === contactId);
	return findContact;
}

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const removedContact = contacts.filter((contact)=> contact.id !== contactId);
	await fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2));
}

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = { ...body, id: Date.now().toString() };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((c) => c.id === contactId);

	if (index === -1) {
		throw new Error('Not found');
	}

	contacts[index] = { ...contacts[index], ...body };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
