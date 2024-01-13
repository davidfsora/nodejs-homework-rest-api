const service = require('../service/index');

const listContacts = async (req, res, next) => {
	try {
		const results = await service.getAllContacts();
		res.json({
			status: 'success',
			code: 200,
			data: {
				contacts: results,
			},
		});
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const getContactById = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const results = await service.getContactById(contactId);
		if (results) {
			res.json({
				status: 'success',
				code: 200,
				data: { contact: results },
			});
		} else {
			res.status(404).json({
				status: 'error',
				code: 404,
				message: `Not found contact with id: ${contactId}`,
				data: 'Not Found',
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const addContact = async (req, res, next) => {
	try {
		const results = await service.createContact(req.body);
		res.json({
			status: 'success',
			code: 200,
			data: {
				contacts: results,
			},
		});
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const updateContact = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const results = await service.updateContact(contactId, req.body);
		if (results) {
			res.json({
				status: 'success',
				code: 200,
				data: { contact: results },
			});
		} else {
			res.status(404).json({
				status: 'error',
				code: 404,
				message: `Not found contact with id: ${contactId}`,
				data: 'Not Found',
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const updateStatusContact = async (req, res, next) => {
	const { contactId } = req.params;
	const { favorite } = req.body;
	if ( favorite !== undefined ){
		try {
			const results = await service.updateStatusContact(contactId, req.body);
			if (results) {
				res.json({
					status: 'success',
					code: 200,
					data: { contact: results },
				});
			} else {
				res.status(404).json({
					status: 'error',
					code: 404,
					message: `Not found contact with id: ${contactId}`,
					data: 'Not Found',
				});
			}
		} catch (e) {
			console.error(e);
			next(e);
		}
	}	else {
		res.status(400).json({
			status: 'error',
			code: 400,
			message: `missing field favorite`,
			data: 'Bad request',
		});
	}
};

const removeContact = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const results = await service.removeContact(contactId);
		if (results) {
			res.json({
				status: 'success',
				code: 200,
				data: { contact: results },
			});
		} else {
			res.status(404).json({
				status: 'error',
				code: 404,
				message: `Not found contact with id: ${contactId}`,
				data: 'Not Found',
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
}
