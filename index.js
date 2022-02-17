"use strict";

const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");
const doc = new PDFDocument();

const data = require("./data");
// const { no, productCode, qty, oum, price } = data.items;

console.log(
  data.items.map((item) => {
    const { no, productCode, desc, qty, oum, price } = item;
    return [no, productCode, desc, qty, oum, price];
  })
);

doc.pipe(fs.createWriteStream("example.pdf"));

const table0 = {
  headers: ["No", "Product Code", "Description", "Qty", "OUM", "Price"],
  //   headers: ["Word", "Comment", "Summary"],
  //   rows: [
  //     [
  //       "Apple",
  //       "Not this one",
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra at ligula gravida ultrices. Fusce vitae pulvinar magna.",
  //     ],
  //     [
  //       "Tire",
  //       "Smells like funny",
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra at ligula gravida ultrices. Fusce vitae pulvinar magna.",
  //     ],
  //   ],
  rows: data.items.map((item) => {
    const { no, productCode, desc, qty, oum, price } = item;
    return [no, productCode, desc, qty, oum, price];
  }),
};

doc.table(table0, {
  prepareHeader: () => doc.font("Helvetica-Bold"),
  prepareRow: (row, i) => doc.font("Helvetica").fontSize(12),
});

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
