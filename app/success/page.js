import { verifyEsewaPayment } from '../action';


export default async function SuccessPage({ searchParams }) {
  const verification = await verifyEsewaPayment(searchParams);
  
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Transaction ID: {searchParams.transaction_uuid}</p>
    </div>
  );
}