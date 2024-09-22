"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPdf = exports.handleAllListOfPdf = exports.addProductsAndGeneratePDF = void 0;
const Product_1 = require("../models/Product");
const puppeteer = require('puppeteer');
const path = require('path');
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
const PDFDocument = require('pdfkit');
const calculateGST = (totalAmount) => {
    return totalAmount * 0.18;
};
const addProductsAndGeneratePDF = async (req, res) => {
    const currentUser = req.user;
    try {
        const { products } = req.body;
        const totalAmount = products.reduce((acc, product) => acc + product.qty * product.rate, 0);
        const gst = calculateGST(totalAmount);
        const grandTotal = totalAmount + gst;
        const newQuotation = new Product_1.Product({
            user: currentUser?.id,
            products,
            totalAmount,
            gst,
            grandTotal,
        });
        await newQuotation.save();
        const cssPath = path.join(__dirname, '..', 'public', 'style.css');
        const validUntil = '12/04/2024';
        const htmlContent = await ejs_1.default.renderFile(path.join(__dirname, '..', 'views', 'template.ejs'), {
            products,
            totalAmount,
            gst,
            grandTotal,
            validUntil,
            date: new Date().toLocaleDateString(),
            cssPath: cssPath
        });
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, {
            waitUntil: 'load',
            timeout: 0,
        });
        const outputDir = path.join(__dirname, '..', 'output');
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir, { recursive: true });
        }
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const pdfPath = path.join(outputDir, `quotation_${timestamp}.pdf`);
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
        });
        await browser.close();
        res.status(201).send({
            message: 'Quotation saved and PDF generated successfully',
            pdfPath: pdfPath,
        });
    }
    catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Server Error');
    }
};
exports.addProductsAndGeneratePDF = addProductsAndGeneratePDF;
const handleAllListOfPdf = async (req, res) => {
    try {
        const response = await Product_1.Product.find();
        res.status(200).json({ success: true, response });
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
};
exports.handleAllListOfPdf = handleAllListOfPdf;
const downloadPdf = async (req, res) => {
    const productId = (req.params.id);
    console.log({ productId });
    const product = await Product_1.Product.findById(productId);
    console.log({ product });
    if (!product) {
        return res.status(404).send('Product not found');
    }
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    doc.pipe(res);
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Date: ${product.date.toDateString()}`);
    doc.moveDown();
    doc.fontSize(18).text('Products:', { underline: true });
    product.products.forEach(product => {
        doc.fontSize(14).text(`- ${product.name} (Qty: ${product.qty}, Rate: $${product.rate}, Total: $${product.qty * product.rate})`);
    });
    doc.moveDown();
    doc.fontSize(16).text(`Total Amount: $${product.totalAmount}`);
    doc.text(`GST: $${product.gst}`);
    doc.text(`Grand Total: $${product.grandTotal}`);
    doc.moveDown();
    doc.text('Thank you for your purchase!', { align: 'center' });
    doc.end();
};
exports.downloadPdf = downloadPdf;
