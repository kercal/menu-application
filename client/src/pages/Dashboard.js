import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import TableOrders from "./TableOrders"; // This component will display orders for a selected table

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // Log the token being sent

      try {
        const response = await axios.get("http://localhost:5000/api/tables", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Tables fetched:", response.data); // Log the response data
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
        setError("Failed to load tables. Please try again.");
      }
    };

    fetchTables();
  }, []);

  const handleTableSelect = async (table) => {
    setSelectedTable(table);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/orders/${table._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Orders for table ${table.number}:`, response.data); // Log the orders data
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Row>
        <Col md={4}>
          <h4>Tables</h4>
          {tables.map((table) => (
            <Card key={table._id} className="mb-3">
              <Card.Body>
                <Card.Title>Table {table.number}</Card.Title>
                <Button onClick={() => handleTableSelect(table)}>
                  View Orders
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={8}>
          {selectedTable && (
            <TableOrders table={selectedTable} orders={orders} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
