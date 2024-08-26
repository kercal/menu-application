import React, { useState, useEffect } from "react";
import { Container, Button, Form, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategoriesAndMenuItems = async () => {
      const token = localStorage.getItem("token");
      try {
        const [categoriesResponse, menuResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/menu", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCategories(categoriesResponse.data);
        setMenuItems(menuResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch categories and menu items.");
      }
    };

    fetchCategoriesAndMenuItems();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        { name: newCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory("");
      setSuccess("Category added successfully!");
    } catch (error) {
      setError("Failed to add category. Please try again.");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/menu",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newItem = response.data[response.data.length - 1];

      // Find the category name from the selectedCategory ID
      const categoryName =
        categories.find((category) => category._id === selectedCategory)
          ?.name || "Uncategorized";

      // Add the category name to the newItem object
      newItem.category = { _id: selectedCategory, name: categoryName };

      setMenuItems((prevItems) => [...prevItems, newItem]);
      console.log("Menu item added:", newItem);
      setName("");
      setPrice("");
      setImage(null);
      setDescription("");
      setSelectedCategory("");
      setSuccess("Menu item added successfully!");
    } catch (error) {
      setError("Failed to add menu item. Please try again.");
      console.error("Error adding menu item:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Manage Menu</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleAddCategory} className="mt-4">
        <Form.Group controlId="formCategory">
          <Form.Label>New Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Add Category
        </Button>
      </Form>

      <Form onSubmit={handleAddItem} className="mt-4">
        <Form.Group controlId="formName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            maxLength={200}
            placeholder="Enter description (max 200 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCategorySelect" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Add Item
        </Button>
      </Form>

      <h3 className="mt-5">Current Menu Items</h3>
      <ListGroup className="mt-3">
        {menuItems.map((item) => (
          <ListGroup.Item
            key={item._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{item.name}</h5>
              <p>Price: ${item.price}</p>
              <p>Description: {item.description}</p>
              <p>
                Category:{" "}
                {categories.find(
                  (category) => category._id === item.category?._id
                )?.name || "Uncategorized"}
              </p>
              {item.image && (
                <img
                  src={`http://localhost:5000/${item.image}`}
                  alt={item.name}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Menu;
