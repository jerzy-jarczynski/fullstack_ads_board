import AdAddOrEditForm from "../../features/AdAddOrEditForm/AdAddOrEditForm";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
// import { getUser } from "../../../redux/usersRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdNew = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(getUser);

  const handleSubmit = (ad) => {
    
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);
  
  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">
            Add new advertisement
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AdAddOrEditForm action={handleSubmit} />
        </Col>
      </Row>
    </>
  );

};

export default AdNew;