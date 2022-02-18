'use strict';

const fs = require('fs');
const PDFDocument = require('./pdfkit-tables2');
const data = require('./data');

const configuration = {
	size: 'A4',
	margins: { top: 0, left: 0, right: 0, bottom: 0 },
};

const doc = new PDFDocument(configuration);
doc.pipe(fs.createWriteStream('hello.pdf'));

const table0 = {
	headers: [
		'No',
		'Product Code',
		'Description',
		'Qty',
		'OUM',
		'Price',
		'Total Price',
	],
	// headers: ['No', 'Product Code'],
	rows: data.items.map((item) => {
		const { no, productCode, desc, qty, oum, price } = item;
		return [no, productCode.trim(), desc.trim(), qty, oum.trim(), price];
	}),
};

doc.table(table0);

// doc.on('data', (chunk) => {
// 	let json = JSON.stringify(chunk);
// 	let bufferOriginal = Buffer.from(JSON.parse(json).data);
// 	console.log(bufferOriginal.toString('utf-8'));
// });

doc.end();
