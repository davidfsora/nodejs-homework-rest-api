const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../../models/contacts');

const validateContact = (contact) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		phone: Joi.string().required(),
	});

	return schema.validate(contact);
};

router.get('/', async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const contact = await getContactById(contactId);
		if (!contact) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	const { error } = validateContact(req.body);
	if (error) {
		return res.status(400).json({ message: `Missing required ${error.details[0].context.label} field` });
	}

	try {
		const newContact = await addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.delete('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	try {
		await removeContact(contactId);
		res.status(200).json({ message: 'Contact deleted' });
	} catch (error) {
		next(error);
	}
});

router.put('/:contactId', async (req, res, next) => {
	const { contactId } = req.params;
	const { error } = validateContact(req.body);

	if (error) {
		return res.status(400).json({ message: 'Missing fields' });
	}

	try {
		const updatedContact = await updateContact(contactId, req.body);
		res.status(200).json(updatedContact);
	} catch (error) {
		if (error.message === 'Not found') {
			return res.status(404).json({ message: 'Not found' });
		}
		next(error);
	}
});

module.exports = router;
