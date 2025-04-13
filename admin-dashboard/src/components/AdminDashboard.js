import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const response = await axios.get("/api/admin/pending-users", {
        headers: { Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN` },
      });
      setPendingUsers(response.data);
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    await axios.put(`/api/admin/approve/${userId}`, {}, {
      headers: { Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN` },
    });
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleReject = async (userId) => {
    await axios.put(`/api/admin/reject/${userId}`, {}, {
      headers: { Authorization: `Bearer YOUR_ADMIN_JWT_TOKEN` },
    });
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {pendingUsers.map((user) => (
          <li key={user.id}>
            {user.email}
            <button onClick={() => handleApprove(user.id)}>Approve</button>
            <button onClick={() => handleReject(user.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}