import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct {
  name: string;
  qty: number;
  rate: number;
}

export interface IQuotation extends Document {
  user: Schema.Types.ObjectId;
  products: IProduct[];
  totalAmount: number;
  gst: number;
  grandTotal: number;
  date: Date;
}

const QuotationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      rate: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  gst: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IQuotation>('Product', QuotationSchema);