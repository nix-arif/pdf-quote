'use strict';

const fs = require('fs');
const PDFDocument = require('pdfkit-table');

const data = require('./data');
const doc = new PDFDocument({ margin: 30, size: 'A4' });

// const { no, productCode, qty, oum, price } = data.items;

doc.pipe(fs.createWriteStream('example.pdf'));

const { name, address, department } = data.customer;

doc.text(`${name}, (${department})`);
doc.text(`
${address}, 
(${department})
`);
const prevX = doc.x;
doc.text(new Date(), 400, doc.y, { align: 'right' });

doc.x = prevX;

const table0 = {
	// title: 'Quotation',
	headers: ['No', 'Product Code', 'Description', 'Qty', 'OUM', 'Price'],
	rows: data.items.map((item) => {
		const { no, productCode, desc, qty, oum, price } = item;
		return [no, productCode.trim(), desc.trim(), qty, oum.trim(), price];
	}),
};

doc.table(table0, () => {});

// doc.moveDown().table(table1, 100, 350, { width: 300 });

doc.end();
