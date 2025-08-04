import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('/src/data/laptimes.json')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        setEntries(sorted);
      });
  }, []);

  return (
    <div>
      <h2>🏁 Racing Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Lap Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index} style={{ fontWeight: index < 3 ? 'bold' : 'normal' }}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
