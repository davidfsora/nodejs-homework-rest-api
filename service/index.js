const Contact = require('./schemas/contact');

const getAllContacts = async () => {
	return Contact.find();
};

const getContactById = contactId => {
	return Contact.findById(contactId);
};

const createContact = ({ name, email, phone }) => {
	return Contact.create({ name: name, email: email, phone: phone });
};

const updateContact = (contactId, fields) => {
	return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

const updateStatusContact = (contactId, fields) => {
	return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

const removeContact = contactId => {
	return Contact.findByIdAndDelete({ _id: contactId });
};

module.exports = {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	updateStatusContact,
	removeContact,
};