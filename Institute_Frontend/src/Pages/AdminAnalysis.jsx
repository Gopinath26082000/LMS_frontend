import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend } from 'recharts';
import AdminNavbar from './AdminNavbar';

// Utility function to generate random colors
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Custom Tooltip to enhance its design
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
        transition: 'transform 0.2s ease-in-out',
      }}>
        <h4 style={{ margin: 0, color: '#333', fontSize: '16px' }}>{name}</h4>
        <p style={{ margin: '5px 0', color: '#888' }}>File Count: {value}</p>
      </div>
    );
  }
  return null;
};

function AdminAnalysis() {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch files data from backend inside AdminAnalysis component
  useEffect(() => {
    fetch('http://localhost:6900/files/all')
      .then((response) => response.json())
      .then((data) => {
        setFileData(data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
        setLoading(false);
      });
  }, []);

  // Group files by email and count number of files for each email
  const getEmailFileCount = () => {
    const emailFileCount = fileData.reduce((acc, file) => {
      if (acc[file.email]) {
        acc[file.email] += 1;
      } else {
        acc[file.email] = 1;
      }
      return acc;
    }, {});
    return emailFileCount;
  };

  const emailFileCount = getEmailFileCount();

  // Convert the grouped data into the format required by PieChart and BarChart
  const chartData = Object.keys(emailFileCount).map((email) => ({
    name: email,
    value: emailFileCount[email],
  }));

  // Generate random colors dynamically for the Pie chart
  const COLORS = chartData.map(() => generateRandomColor());

  return (
    <div>
        <AdminNavbar/>
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', fontSize: '30px', color: '#333', marginBottom: '20px' }}>File Analysis</h2>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
                animationDuration={1000}
                style={{ transition: 'transform 0.5s ease' }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
            </PieChart>
          </ResponsiveContainer>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip content={<CustomTooltip />} />
              <RechartsLegend />
              <Bar dataKey="value" animationDuration={1000}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
    </div>
  );
}

export default AdminAnalysis;
