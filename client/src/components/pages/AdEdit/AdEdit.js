import AdAddOrEditForm from "../../features/AdAddOrEditForm/AdAddOrEditForm";
import { Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAdRequest, getAdById, loadAdsRequest } from "../../../redux/adsRedux";
// import { getUser } from "../../../redux/usersRedux";
import { useEffect } from "react";

const AdEdit = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => getAdById(state, id));
  // const user = useSelector(getUser);
  
  const handleSubmit = (ad) => {

  };

  useEffect(() => {
    // if (!user || data.seller.login !== user.login) {
    //   navigate("/");
    // }

    if (data && Object.keys(data).length === 0) {
      navigate("/");
    }

    if (!data || (data && Object.keys(data).length === 0)) {
      dispatch(loadAdsRequest());
    }
  }, [data, dispatch, navigate]);

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }  

  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">
            Edit advertisement
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AdAddOrEditForm action={handleSubmit} {...data} />
        </Col>
      </Row>
    </>
  );

};

export default AdEdit;