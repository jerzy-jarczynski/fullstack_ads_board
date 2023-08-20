import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null); // null, clientError

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example validation
    if (!login || !password) {
      setStatus("clientError");
    } else {
      setStatus(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      {status === "clientError" && (
        <Alert variant="danger">
          Login or Password are Incorrect
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Enter login"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
