const fs = require('fs');
const PDFDocument = require('pdfkit-table');
const data = require('./data');

const doc = new PDFDocument({ size: 'A4', margin: 30 });

doc.pipe(fs.createWriteStream('x.pdf'));

const { name, address, department } = data.customer;
doc.text(name);
doc.text(address);
doc.text(department);

const usableWidth = doc.page.width - 2 * doc.page.margins.left;
console.log('totalWidth:', doc.page.width);
console.log('usableWidth: ', usableWidth);
const numberOfColumn = Object.keys(data.items[0]).length + 1;
console.log('numberOfColumn:', numberOfColumn);
const noColWidth = usableWidth / 14;
const prodCodeColWidth = (2 * usableWidth) / 14;
const descColWidth = (5 * usableWidth) / 14;
const qtyColWidth = usableWidth / 14;
const oumColWidth = usableWidth / 14;
const priceColWidth = (2 * usableWidth) / 14;
const totalPriceColWidth = (2 * usableWidth) / 14;

const table = {
	headers: [
		{ label: 'No', property: 'no', width: noColWidth, renderer: null },
		{
			label: 'Product Code',
			property: 'productCode',
			width: prodCodeColWidth,
			renderer: null,
		},
		{
			label: 'Description',
			property: 'desc',
			width: descColWidth,
			renderer: null,
		},
		{ label: 'Qty', property: 'qty', width: qtyColWidth, renderer: null },
		{ label: 'Oum', property: 'oum', width: oumColWidth, renderer: null },
		{
			label: 'Price/Unit',
			property: 'price',
			width: priceColWidth,
			renderer: null,
		},
		{
			label: 'Price Total',
			property: 'totalPrice',
			width: totalPriceColWidth,
			renderer: (value, indexColumn, indexRow, row) => {
				return `RM ${Number(value).toFixed(2)}`;
			},
		},
	],
	rows: data.items.map((item) => [
		item.no,
		item.productCode.trim(),
		item.desc.trim(),
		item.qty,
		item.oum.trim(),
		item.price,
		item.qty * item.price,
	]),
};

doc.table(table, {
	prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8),
	prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
		doc.font('Helvetica').fontSize(8);
		indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
	},
});

doc.end();
