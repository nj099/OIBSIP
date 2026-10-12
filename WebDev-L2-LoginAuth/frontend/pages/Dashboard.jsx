import "../src/App.css";

import { useEffect, useState } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard.");
        }

        setDashboardData(data);
      } catch (err) {
        setError(err.message || "Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>{dashboardData.message}</p>
      <p>Email: {dashboardData.email}</p>
    </main>
  );
}

export default Dashboard;
