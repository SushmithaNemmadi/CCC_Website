import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!token || !userData) return;

      setUser(userData);

      try {
        const res = await fetch(`http://localhost:5000/orders/${userData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading your profile and orders...</div>;

  return (
    <div className="p-4">
      <h2>My Profile</h2>
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      )}

      <h3 className="mt-6">My Orders</h3>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, idx) => (
            <li key={order._id} className="order-item">
              <h4>Order #{idx + 1}</h4>
              <p><strong>Status:</strong> {order.status || "Placed"}</p>
              <p><strong>Products:</strong></p>
              <ul>
                {Array.isArray(order.prod)
                  ? order.prod.map((p, i) => (
                      <li key={i}>
                        {p.name || p.title || "Unnamed Product"}
                      </li>
                    ))
                  : "No products found"}
              </ul>
              <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
