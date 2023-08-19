import { useParams } from "react-router-dom";
import { getAdById, removeAdRequest, loadAdsRequest } from "../../../redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card } from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { useEffect } from "react";

const AdOverview = () => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector(getUser);
  const data = useSelector((state) => getAdById(state, id));

  console.log('user: ', user);
  console.log('data: ', data);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch, id]);

  return (
    <div>
      AdOverview
    </div>
  );

};

export default AdOverview;