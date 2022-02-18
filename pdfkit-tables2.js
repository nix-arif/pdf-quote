'use strict';

const fs = require('fs');
const PDFDocument = require('pdfkit');

class PDFDocumentWithTables extends PDFDocument {
	constructor(options) {
		super(options);
	}

	// method table
	table(table, arg0, arg1, arg2) {
		let startX = this.page.margins.top,
			startY = this.y;

		let options = {};

		// check the options

		this.page.margins = { top: 72, left: 72, right: 40, bottom: 72 };
		(startX = this.page.margins.top), (startY = this.page.margins.top);
		const columnCount = table.headers.length;
		const columnSpacing = options.columnsSpacing || 15;
		const rowSpacing = options.rowSpacing || 5;
		const usableWidth =
			options.width ||
			this.page.width - this.page.margins.left - this.page.margins.right;
		console.log('usableWidth', usableWidth);
		// Custom
		const tablePadding = options.tablePadding || 10;

		// Prepare Header
		const prepareHeader = options.prepareHeader || (() => {});
		const prepareRow = options.prepareRow || (() => {});

		const columnContainerWidth = usableWidth / columnCount;
		const columnWidth = columnContainerWidth - columnSpacing;
		console.log('columnWidth:', columnWidth);

		prepareHeader();

		const drawLineAbove = (xFrom, yFrom, xTo, yTo, width) => {
			this.moveTo(xFrom, yFrom).lineTo(xTo, yTo).lineWidth(width).stroke();
		};

		const drawBox = (x1, y1, x2, y2, width) => {
			// console.log(`[${Math.round(x1)}, ${Math.round(y1)}]`);
			// console.log(`[${Math.round(x2)}, ${Math.round(y1)}]`);
			// console.log(`[${Math.round(x2)}, ${Math.round(y2)}]`);
			// console.log(`[${Math.round(x1)}, ${Math.round(y2)}]`);
			// console.log('-----------------------------------------');

			// this.text(`x1, y1 [${Math.round(x1)}, ${Math.round(y1)}]`, x1, y1);
			// this.text(`x2, y1 [${Math.round(x2)}, ${Math.round(y1)}]`, x2, y1);
			// this.text(`x2, y2 [${Math.round(x2)}, ${Math.round(y2)}]`, x2, y2);
			// this.text(`x1, y2 [${Math.round(x1)}, ${Math.round(y2)}]`, x1, y2);
			this.polygon([x1, y1], [x2, y1], [x2, y2], [x1, y2]).lineWidth(width);
			this.stroke();
		};

		// drawLineAbove(0, 20, 595.28, 20, 5);

		// Set the page margins

		this.font('Courier-Bold');
		this.fontSize(12);
		table.headers.forEach((header, i) => {
			drawBox(
				startX + i * columnContainerWidth,
				startY,
				startX + (i + 1) * columnContainerWidth,
				startY + columnContainerWidth,
				1
			);
			this.text(
				header,
				startX + tablePadding + i * columnContainerWidth,
				startY + tablePadding,
				{
					width: columnWidth,
					align: 'left',
				}
			);
		});
	}
}

module.exports = PDFDocumentWithTables;
