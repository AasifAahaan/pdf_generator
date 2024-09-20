"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductsAndGeneratePDF = void 0;
const calculateGST = (totalAmount) => {
    return totalAmount * 0.18;
};
// Controller to add products and generate PDF
const addProductsAndGeneratePDF = async (req, res) => {
    console.log("Checking routes working...");
    // try {
    //     //   const token = req.header('Authorization')?.split(' ')[1];
    //     //   if (!token) {
    //     //     return res.status(401).json({ msg: 'No token, authorization denied' });
    //     //   }
    //     // Verify Token
    //     //   const decoded: any = jwt.verify(token, 'jwtSecret');
    //     //   const userId = decoded.id;
    //     const { products } = req.body;
    //     const totalAmount = products.reduce(
    //         (acc: number, product: any) => acc + product.qty * product.rate,
    //         0
    //     );
    //     const gst = calculateGST(totalAmount);
    //     const grandTotal = totalAmount + gst;
    //     const newQuotation = new Product({
    //         user: "66ed953d51acb45041caf6bb",
    //         products,
    //         totalAmount,
    //         gst,
    //         grandTotal,
    //     });
    //     await newQuotation.save();
    //     // Generate PDF
    //     // const doc = new PDFDocument();
    //     // let buffers: any[] = [];
    //     // doc.on('data', buffers.push.bind(buffers));
    //     // doc.on('end', () => {
    //     //     const pdfData = Buffer.concat(buffers);
    //     //     res.setHeader('Content-Type', 'application/pdf');
    //     //     res.setHeader('Content-Disposition', 'attachment; filename=quotation.pdf');
    //     //     res.send(pdfData);
    //     // });
    //     // // PDF Layout
    //     // doc.fontSize(16).text('Quotation Invoice', { align: 'center' });
    //     // doc.moveDown();
    //     // doc.text(`Date: ${new Date().toLocaleDateString()}`);
    //     // doc.moveDown();
    //     // // Product Table Header
    //     // doc.text('Product', 100, 100);
    //     // doc.text('Qty', 250, 100);
    //     // doc.text('Rate', 300, 100);
    //     // doc.text('Total', 350, 100);
    //     // doc.moveDown();
    //     // // Product details
    //     // products.forEach((product: any) => {
    //     //     const productTotal = product.qty * product.rate;
    //     //     doc.text(product.name, 100);
    //     //     doc.text(product.qty.toString(), 250);
    //     //     doc.text(product.rate.toString(), 300);
    //     //     doc.text(productTotal.toString(), 350);
    //     //     doc.moveDown();
    //     // });
    //     // // Summary
    //     // doc.text(`Total: INR ${totalAmount}`, { align: 'right' });
    //     // doc.text(`GST (18%): INR ${gst}`, { align: 'right' });
    //     // doc.text(`Grand Total: INR ${grandTotal}`, { align: 'right' });
    //     // doc.end();
    // } catch (err: any) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }
};
exports.addProductsAndGeneratePDF = addProductsAndGeneratePDF;
