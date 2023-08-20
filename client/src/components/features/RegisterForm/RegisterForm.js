import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    phone: "",
    avatar: "",  // Initially set as an empty string
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.login) newErrors.login = "Login is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.avatar) newErrors.avatar = "Avatar is required";

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          placeholder="Enter login"
          isInvalid={errors.login}
        />
        <Form.Control.Feedback type="invalid">
          {errors.login}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          isInvalid={errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAvatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          name="avatar"
          onChange={handleAvatarChange}
          isInvalid={errors.avatar}
        />
        <Form.Control.Feedback type="invalid">
          {errors.avatar}
        </Form.Control.Feedback>
        {avatarPreview && (
          <Image src={avatarPreview} alt="Avatar Preview" thumbnail className="mt-3" />
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;
