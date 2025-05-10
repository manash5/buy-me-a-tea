'use server';

import crypto from 'crypto';

export async function initiateEsewaPayment(paymentData) {
  // Your eSewa merchant credentials (from .env)
  const merchantId = process.env.ESEWA_PRODUCT_CODE;
  const secretKey = process.env.ESEWA_SECRET_KEY;


  // Prepare the data to be signed
  const fieldsToSign = paymentData.signed_field_names.split(',');
  const dataToSign = fieldsToSign
    .map(field => `${field}=${paymentData[field]}`)
    .join(',');

  // Generate the signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(dataToSign)
    .digest('base64');

  // Return the complete payment data with signature
  return {
    ...paymentData,
    signature,
  };
}