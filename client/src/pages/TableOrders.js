// client/src/pages/TableOrders.js

import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const TableOrders = ({ table, orders }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Orders for Table {table.number}</Card.Title>
        {orders.length > 0 ? (
          <ListGroup variant="flush">
            {orders.map((order, index) => (
              <ListGroup.Item key={index}>
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    <strong>{item.name}</strong> - {item.quantity} x $
                    {item.price}
                  </div>
                ))}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No orders for this table.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default TableOrders;
