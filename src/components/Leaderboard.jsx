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
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <h2>🏁 Racing Leaderboard</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '2px solid #fff' }}>Position</th>
          <th style={{ borderBottom: '2px solid #fff' }}>Driver</th>
          <th style={{ borderBottom: '2px solid #fff' }}>Lap Time</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => {
          let color = '#fff';
          if (index === 0) color = 'gold';
          else if (index === 1) color = 'silver';
          else if (index === 2) color = '#cd7f32'; // bronze
          return (
            <tr key={index} style={{ color, borderBottom: '1px solid #444' }}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.time}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

}
