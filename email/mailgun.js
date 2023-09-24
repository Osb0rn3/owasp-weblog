const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '2be9036bbc9234c1823d3303948ce6a5-4b98b89f-767a2742' });

module.exports = mg