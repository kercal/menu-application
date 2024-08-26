import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";

const TablePage = () => {
  const { dynamicId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/menu/public/${dynamicId}`
        );
        setMenuItems(response.data);
      } catch (error) {
        setError("Error fetching menu items. Please try again.");
      }
    };

    fetchMenuItems();
  }, [dynamicId]);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((id) => id !== itemId)
        : [...prevItems, itemId]
    );
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/orders`, {
        tableId: dynamicId,
        items: selectedItems,
      });
      setSuccess("Order placed successfully!");
      setSelectedItems([]);
    } catch (error) {
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Table {dynamicId}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <h3>Menu</h3>
      <ListGroup className="mt-3">
        {menuItems.map((item) => (
          <ListGroup.Item
            key={item._id}
            onClick={() => handleSelectItem(item._id)}
            active={selectedItems.includes(item._id)}
          >
            <h5>{item.name}</h5>
            <p>Price: ${item.price}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button
        variant="primary"
        className="mt-4"
        onClick={handlePlaceOrder}
        disabled={selectedItems.length === 0}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default TablePage;
