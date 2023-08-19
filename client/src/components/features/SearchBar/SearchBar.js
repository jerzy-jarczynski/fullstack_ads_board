import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


const SearchBar = () => {

  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <Row>
      <Col xs={12} md={6} lg={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Search ads..." onChange={(e) => setSearchPhrase(e.target.value)} />
          </Form.Group>
          <Link to={`/search/${searchPhrase}`}>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Link>
        </Form>
      </Col>
    </Row>
  );

};

export default SearchBar;