import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('/laptimes.json') // JSON should be in /public for production
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        setEntries(sorted);
      })
      .catch(err => console.error("Error loading leaderboard:", err));
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
            else if (index === 2) color = '#cd7f32';

            return (
              <tr key={index} style={{ borderBottom: '1px solid #444' }}>
                <motion.td
                  style={{ color }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  {index + 1}
                </motion.td>
                <motion.td
                  style={{ color }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.05 }}
                >
                  {entry.name}
                </motion.td>
                <motion.td
                  style={{ color }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                >
                  {entry.time}
                </motion.td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
