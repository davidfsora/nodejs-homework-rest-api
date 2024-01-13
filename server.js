const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');

const PORT = 3000;
const uriDb = "mongodb+srv://davidsora0204:Davidsora10@cluster0.oo3fa7a.mongodb.net/db-contacts?retryWrites=true&w=majority";

const connection = mongoose.connect(uriDb);

const contactsRouter = require('./api/index');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

connection
	.then(() => {
		app.listen(PORT, function () {
			console.log(`Database connection successful`);
		});
	})
	.catch(err =>
		console.log(`Server not running. Error message: ${err.message}`),
	);

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message })
});
