import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
{/*import QRCode from 'qrcode.react';*/}

const TicketPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch ticket info from backend
    fetch(`${API_URL}/api/tickets/${ticketId}`)
      .then(res => res.json())
      .then(data => {
        setTicket(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load ticket details');
        setLoading(false);
      });
  }, [ticketId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handlePrint = () => window.print();

  return (
    <div className="p-6 bg-white shadow-md max-w-3xl mx-auto print:bg-white print:shadow-none">
      <h1 className="text-2xl font-bold mb-4">Event Ticket</h1>

      <div className="mb-4">
        <p><strong>Event:</strong> {ticket.eventName}</p>
        <p><strong>Date & Time:</strong> {ticket.dateTime}</p>
        <p><strong>Venue:</strong> {ticket.venueName}</p>
        <p><strong>Name:</strong> {ticket.userName}</p>
        <p><strong>Email:</strong> {ticket.email}</p>
        <p><strong>Seat(s):</strong> {ticket.seats.join(', ')}</p>
      </div>

     {/* <div className="mb-4">
        <QRCode value={JSON.stringify({ ticketId, user: ticket.email })} />
      </div>*/}

      <div className="mb-4">
        <h2 className="font-semibold">Path to Seat</h2>
        {/* Dynamically render seat path if available */}
        {ticket.pathImageUrl ? (
          <img src={ticket.pathImageUrl} alt="Path to seat" className="mt-2 border" />
        ) : (
          <p>No path available.</p>
        )}
      </div>

      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Print Ticket
      </button>
    </div>
  );
};

export default TicketPage;
