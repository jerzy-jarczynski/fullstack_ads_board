import PropTypes from 'prop-types';
import { Spinner, Row, Col } from "react-bootstrap";
import AdSummary from '../AdSummary/AdSummary';

const AdsGrid = ({ ads }) => {
  
  if (!ads) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  
  return (
    <Row>
      {
        ads.map((ad, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <AdSummary id={ad._id} title={ad.title} image={ad.image} location={ad.location} />
          </Col>
        ))
      }
    </Row>
  );

};

AdsGrid.propTypes = {
  ads: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      image: PropTypes.string,
      location: PropTypes.string,
      price: PropTypes.number,
      publishDate: PropTypes.string,
      seller: PropTypes.shape({
        _id: PropTypes.string,
        login: PropTypes.string,
        password: PropTypes.string,
      }),
      title: PropTypes.string,
      _id: PropTypes.string
    })
  )
};

export default AdsGrid;