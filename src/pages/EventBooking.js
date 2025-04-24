import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import "./EventBooking.css";

const EventBooking = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [pathToSeat, setPathToSeat] = useState([]);
  const [viewPath, setViewPath] = useState(false);
  const [entrances, setEntrances] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [exits, setExits] = useState([]);
  const stepCount = pathToSeat.length > 1 ? pathToSeat.length - 1 : 0;

  const navigate = useNavigate();

  const price = (selectedSeats.length * 20).toFixed(2); // Or use event-specific pricing if available
 
const estimatedDistance = (stepCount * 0.8).toFixed(1); // meters


  const currentUser = JSON.parse(localStorage.getItem("user"));

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Generate random entrances from edge seats
  const generateEntrancesAndExits = (layout, count = 2) => {
    const maxRow = Math.max(...layout.map(s => s.row));
    const maxCol = Math.max(...layout.map(s => s.column));
  
    const edgeSeats = layout.filter(
      seat =>
        seat.row === 0 || seat.row === maxRow || seat.column === 0 || seat.column === maxCol
    );
  
    const shuffled = edgeSeats.sort(() => 0.5 - Math.random());
    const entrances = shuffled.slice(0, count);
    const exits = shuffled.slice(count, count + count);
  
    return { entrances, exits };
  };
  
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event details.");
        const data = await response.json();
        setEvent(data);
        const { entrances: genEntrances, exits: genExits } = generateEntrancesAndExits(data.seatingLayout);
        setEntrances(genEntrances);
        setExits(genExits);

        
      } catch (err) {
        alert(err.message);
      }
    };
  
    fetchEventDetails();
  }, [eventId, API_URL]);
  
  {/*useEffect(() => {
    const generateRandomEntrances = (numEntrances, rows, cols) => {
      const entrances = [];
      for (let i = 0; i < numEntrances; i++) {
        const row = Math.floor(Math.random() * rows);
        const column = Math.floor(Math.random() * cols);
        entrances.push({ id: `gate${i + 1}`, row, column });
      }
      return entrances;
    };
  
    if (event?.seatingLayout) {
      const rows = Math.max(...event.seatingLayout.map((seat) => seat.row)) + 1;
      const cols = Math.max(...event.seatingLayout.map((seat) => seat.column)) + 1;
      const randomEntrances = generateRandomEntrances(3, rows, cols);
      setEntrances(randomEntrances);
    }
  }, [event]);*/}
 {/*useEffect(() => {
  if (!data || !data.seatingLayout) return;

  setEvent(data);

  const { entrances, exits } = generateEntrancesAndExits(data.seatingLayout);
  setEntrances(entrances);
  setExits(exits);

  // Show path only for already booked seats
  const bookedSeats = data.seatingLayout.filter(seat => seat.occupied);
  let allBookedPaths = [];

  bookedSeats.forEach(seat => {
    const path = findPathToSeat(data.seatingLayout, entrances, seat);
    allBookedPaths = [...allBookedPaths, ...path];
  });

  setPathToSeat(allBookedPaths); // merged path of booked seats
}, [data]);
*/}
const handleFetchBookingData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventId}`);
    if (!response.ok) throw new Error("Failed to fetch booking data.");
    const bookingData = await response.json(); // Assuming the API returns booking details
    setBookingDetails({
      eventName: event.eventName,
      eventTime: event.eventTime,
      price: bookingData.price,
      seats: selectedSeats,
      path: pathToSeat,
    });
  } catch (err) {
    alert(err.message);
  }
};
useEffect(() => {
  if (event) {
    handleFetchBookingData();
  }
}, [event]);
      const renderTicketDetails = () => {
        if (!bookingDetails) return null;
    
        return (
          <div className="w-full max-w-md mx-auto mt-8 p-6 rounded-2xl shadow-xl border border-gray-300 bg-gradient-to-br from-yellow-100 via-white to-yellow-200">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🎟️ Your Ticket</h2>

  <div className="space-y-3 text-gray-700">
    <p><strong>Event:</strong> {bookingDetails.eventName}</p>
    <p><strong>Time:</strong> {bookingDetails.eventTime}</p>
    <p><strong>Seats:</strong> {bookingDetails.seats.join(", ")}</p>
    <p><strong>Total Price:</strong> ${bookingDetails.price ? bookingDetails.price.toFixed(2) : "N/A"}</p>
  </div>

  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2 text-gray-800">🧭 Path to Your Seat</h3>
    <div className="space-y-1">
      {bookingDetails.path.map(([row, col], index) => (
        <div key={index} className="text-sm text-gray-600">
          Step {index + 1}: Row {row}, Column {col}
        </div>
      ))}
    </div>
    <p className="mt-2 font-medium text-gray-800">🚶 Estimated Distance: {estimatedDistance} meters</p>
  </div>
</div>

        );
      };
    

  // BFS Pathfinding
  const findPathToSeat = (layout, entrances, targetSeat) => {
    const rows = Math.max(...layout.map((seat) => seat.row)) + 1;
    const cols = Math.max(...layout.map((seat) => seat.column)) + 1;
  
    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  
    layout.forEach((seat) => {
      if (seat.occupied) grid[seat.row][seat.column] = 1; // Mark occupied seats as blocked
    });
  
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
  
    const bfs = (start) => {
      const queue = [[...start, []]];
      const visited = new Set();
      visited.add(`${start[0]}-${start[1]}`);
  
      while (queue.length) {
        const [r, c, path] = queue.shift();
        const newPath = [...path, [r, c]];
  
        if (r === targetSeat.row && c === targetSeat.column) return newPath;
  
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
  
          if (
            nr >= 0 &&
            nc >= 0 &&
            nr < rows &&
            nc < cols &&
            grid[nr][nc] === 0 &&
            !visited.has(`${nr}-${nc}`)
          ) {
            visited.add(`${nr}-${nc}`);
            queue.push([nr, nc, newPath]);
          }
        }
      }
  
      return [];
    };
  
    let shortestPath = [];
    entrances.forEach((entrance) => {
      const path = bfs([entrance.row, entrance.column]);
      if (!shortestPath.length || path.length < shortestPath.length) {
        shortestPath = path;
      }
      
    });
    console.log("Finding path to", targetSeat);
console.log("Entrances:", entrances);
console.log("Layout size:", rows, cols);
console.log("Shortest path found:", shortestPath);
  
    return shortestPath;
  };
  
  const getDirection = (from, to) => {
    const [fr, fc] = from;
    const [tr, tc] = to;
  
    if (fr === tr && fc < tc) return "→";
    if (fr === tr && fc > tc) return "←";
    if (fc === tc && fr < tr) return "↓";
    if (fc === tc && fr > tr) return "↑";
    return ""; // For diagonal or same point (shouldn't happen)
  };
  
  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) return prev.filter((id) => id !== seatId);
      if (prev.length >= 6) {
        alert("You can only book up to 6 seats.");
        return prev;
      }
      return [...prev, seatId];
    });
  };

  // Booking logic
  const handleBooking = async () => {
    let ticketId; // Declare ticketId in the function scope
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId,
          seatIds: selectedSeats,
          attendeeId: currentUser?._id,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }
      const responseData = await response.json();
      ticketId = responseData.ticketId; // Assign the value to the outer variable
  
      alert("Booking confirmed!");
      setSelectedSeats([]);
  
      // Refresh event with updated layout
      const updatedEventRes = await fetch(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedEvent = await updatedEventRes.json();
      setEvent(updatedEvent);
  
      const bookedSeat = updatedEvent.seatingLayout.find(
        (seat) => seat.id === selectedSeats[0]
      );
      const computedPath = findPathToSeat(
        updatedEvent.seatingLayout,
        entrances,
        { row: bookedSeat.row, column: bookedSeat.column }
      );
      setPathToSeat(computedPath);
      setViewPath(true);
    } catch (error) {
      alert("Error booking seats: " + error.message);
    }
  
    if (ticketId) {
      navigate(`/ticket/${ticketId}`); // Navigate only if ticketId exists
    }
  };
  
  


  const renderPathToSeat = () => {
    if (!pathToSeat.length) return null;
    return (
      <div>
        <h3>Path to Seat</h3>
        <div className="path">
          {pathToSeat.map(([row, column], index) => (
            <div key={index} className="path-step">
              Step {index + 1}: Row {row}, Column {column}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAuditoriumLayout = (layout) => {
    const rows = Math.max(...layout.map((seat) => seat.row)) + 1;
    const cols = Math.max(...layout.map((seat) => seat.column)) + 1;
    const getSeatColor = (seat) => {
      const isOnPath = viewPath && pathToSeat.some(
        ([row, col]) => row === seat.row && col === seat.column
      );
    
      if (entrances.some(e => e.row === seat.row && e.column === seat.column)) return "black";
      if (exits.some(e => e.row === seat.row && e.column === seat.column)) return "orange";
      if (isOnPath) return "gold";
      if (selectedSeats.includes(seat.id)) return "blue";
      if (seat.occupied) return "red";
      return "green";

    };
    
    
    
  
    const getSeatLabel = (seat) => {
      const entranceIdx = entrances.findIndex((e) => e.row === seat.row && e.column === seat.column);
      const exitIdx = exits.findIndex((e) => e.row === seat.row && e.column === seat.column);
  
      if (entranceIdx !== -1) return `Gate ${entranceIdx + 1}`;
      if (exitIdx !== -1) return `Exit ${exitIdx + 1}`;
      return `${seat.row},${seat.column}`;
    };
  
    return (
      <div className="auditorium-map-container">
        {stepCount > 0 && (
        <div style={{ marginBottom: "12px", fontSize: "14px", color: "#333" }}>
          🧭 Estimated Path: <strong>{stepCount} steps</strong> (~{estimatedDistance} m)
        </div>
      )}
        <div
          className="auditorium-grid"
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${rows}, 40px)`,
            gridTemplateColumns: `repeat(${cols}, 40px)`,
            gap: "4px",
          }}
        >
          {layout.map((seat, index) => {
  const isPath = pathToSeat.some(([r, c]) => r === seat.row && c === seat.column);
  const seatIndex = pathToSeat.findIndex(([r, c]) => r === seat.row && c === seat.column);

  const nextStep = seatIndex >= 0 && pathToSeat[seatIndex + 1];
  const direction = nextStep ? getDirection([seat.row, seat.column], nextStep) : "";
  
  

  return (
    <div
      key={seat.id}
      className={`seat ${selectedSeats.includes(seat.id) ? "selected" : ""}`}
      onClick={() => !seat.occupied && handleSeatClick(seat.id)}
      style={{
        backgroundColor: getSeatColor(seat),
        borderRadius: "6px",
        textAlign: "center",
        lineHeight: "40px",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: seat.occupied ? "not-allowed" : "pointer",
        position: "relative",
        boxShadow: isPath ? "0 0 8px 3px #ffeb3b" : "none",
        animation: isPath ? "pulse 1s infinite" : "none",
        transform: `translateY(${Math.sin(seat.column / cols * Math.PI) * 5}px)`,
      }}
    >
      {getSeatLabel(seat)}

      {isPath && direction && (
        <span
          style={{
            position: "absolute",
            bottom: "2px",
            right: "4px",
            fontSize: "14px",
            opacity: 0.8,
          }}
        >
          {direction}
        </span>
      )}
    </div>
  );
})}

        </div>
  
        {/* Legend */}
        <div className="legend" style={{ marginTop: "1rem" }}>
          <h4>Legend</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              ["Available", "green"],
              ["Selected", "blue"],
              ["Booked", "red"],
              ["Entrance", "black"],
              ["Exit", "orange"],
              ["Path", "yellow"],
            ].map(([label, color]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  
  const handleViewPath = () => {
    setPathToSeat([]); // 🔑 Clear previous path
  
    if (selectedSeats.length === 1) {
      const selectedId = selectedSeats[0];
      const seat = event.seatingLayout.find(s => s.id === selectedId);
      if (!seat) return;
  
      const path = findPathToSeat(event.seatingLayout, entrances, seat);
      setPathToSeat(path);
      setViewPath(true);
    }
  };
  


    

  return (
    <div>
      <h1>{event?.eventName}</h1>
      <p>{event?.description}</p>
       <p>Category: {event?.category}</p>
      <p>Date: {new Date(event?.date).toLocaleDateString()}</p>

      {event?.seatingLayout && renderAuditoriumLayout(event.seatingLayout)}

      {selectedSeats.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Seats</h3>
          <p>{selectedSeats.join(", ")}</p>
          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleViewPath} disabled={selectedSeats.length !== 1}>
          Show Path to Seat
        </button>
        {viewPath && renderPathToSeat()}
        {bookingDetails && renderTicketDetails()}
      </div>
    </div>
  );
};

export default EventBooking;
