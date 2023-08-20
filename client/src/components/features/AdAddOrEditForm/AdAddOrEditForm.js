import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { IMGS_URL } from "../../../config";

const AdForm = ({ action, ...data }) => {
  const initialState = {
    title: data.title || "",
    description: data.description || "",
    publishDate: data.publishDate || "",
    price: data.price || "",
    location: data.location || "",
    image: data.image || null,
  };

  const [formFields, setFormFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(data.image ? `${IMGS_URL}${data.image}` : null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormFields((prevFields) => ({ ...prevFields, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const validateFields = () => {
    const newErrors = {};

    for (const field in formFields) {
      if (!formFields[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      action(formFields);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={formFields.title}
          name="title"
          type="text"
          placeholder="Enter title"
          onChange={handleInputChange}
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            {errors.title}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={formFields.description}
          name="description"
          type="text"
          placeholder="Enter description"
          onChange={handleInputChange}
        />
        {errors.description && (
          <small className="d-block form-text text-danger mt-2">
            {errors.description}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="publishDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          value={formFields.publishDate}
          name="publishDate"
          type="date"
          onChange={handleInputChange}
        />
        {errors.publishDate && (
          <small className="d-block form-text text-danger mt-2">
            {errors.publishDate}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          value={formFields.price}
          name="price"
          type="number"
          placeholder="Enter price"
          onChange={handleInputChange}
        />
        {errors.price && (
          <small className="d-block form-text text-danger mt-2">
            {errors.price}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          value={formFields.location}
          name="location"
          type="text"
          placeholder="Enter location"
          onChange={handleInputChange}
        />
        {errors.location && (
          <small className="d-block form-text text-danger mt-2">
            {errors.location}
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <div>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100%', marginTop: '10px' }}
            />
          )}
        </div>
        {errors.image && (
          <small className="d-block form-text text-danger mt-2">
            {errors.image}
          </small>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
  );
};

export default AdForm;