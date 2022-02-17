"use strict";

const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");
const doc = new PDFDocument();

const data = require("./data");
// const { no, productCode, qty, oum, price } = data.items;

doc.pipe(fs.createWriteStream("example.pdf"));

const thisdoty = [];

const table0 = {
  headers: ["No", "Product Code", "Description", "Qty", "OUM", "Price"],
  rows: data.items.map((item) => {
    const { no, productCode, desc, qty, oum, price } = item;
    return [no, productCode.trim(), desc.trim(), qty, oum.trim(), price];
  }),
};

doc.table(table0, {
  prepareHeader: () => doc.font("Helvetica-Bold"),
  prepareRow: (row, i) => doc.font("Helvetica").fontSize(9),
  columnSpacing: 5,
  //   margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

console.log("this.y", doc.y);

const table1 = {
  headers: ["Country", "Conversion rate", "Trend"],
  rows: [
    ["Switzerland", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
  ],
};

// doc.moveDown().table(table1, 100, 350, { width: 300 });

doc.end();
