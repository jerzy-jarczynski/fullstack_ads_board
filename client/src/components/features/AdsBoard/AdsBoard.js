import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";

const AdsBoard = () => {
  const dispatch = useDispatch();

  const [localAds, setLocalAds] = useState(null);
  
  const reduxAds = useSelector(getAds);

  useEffect(() => {
    if (reduxAds) {
      const sortedAds = [...reduxAds].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
      setLocalAds(sortedAds);
    }
  }, [reduxAds]);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (!localAds) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  
  return (
    <Row>
      {
        localAds.map((ad, index) => (
          <Col key={index} xs={12} md={6} lg={4} style={{ backgroundColor: 'red', border: '1px solid yellow' }}>
            {index}
          </Col>
        ))
      }
    </Row>
  );
};

export default AdsBoard;