export default function FailurePage({ searchParams }) {
    return (
      <div>
        <h1>Payment Failed</h1>
        <p>Reason: {searchParams.reason || 'Unknown'}</p>
      </div>
    );
  }