import React, { useEffect, useState } from 'react';
import { Col, Card as AntCard, Skeleton, Row } from 'antd';
import { Card } from '../../pagePartial';
import { GetRecommendedPropertiesAction } from '../../../redux/actions/property';
import { addFavouriteProperty } from '../../../redux/actions/property';
import notification from '../../../utils/services/alert';
import { connect } from 'react-redux';

import './PropertyCards.scss';

const PropCards = (props) => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const didMount = async () => {
      let res = await GetRecommendedPropertiesAction();
      if (res.result) {
        if (res.body)
          setProperties(res.body);
        setLoading(false);
      }
    };
    didMount();
  }, []);

  const onAddFav = async (id) => {
    try {
      if (props.user) {
        const res = await addFavouriteProperty({ propertyId: id });
        notification.success("Property Added to favourites")
      }
      else {
        notification.error("Signin to continue")
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='cmp-property-cards'>
      <Row gutter={[16, 16]}>
        <div className='properties-container'>
          {loading ? (
            <Col xl={6} lg={6} md={8} sm={24} xs={24}>
              <AntCard>
                <Skeleton loading={true} avatar active />
              </AntCard>
            </Col>
          ) : (
              !!properties.length && properties.map((property, key) => (
                <Col key={key} xl={6} lg={6} md={8} sm={24} xs={24}>
                  <Card {...property} onAddFav={onAddFav} />
                </Col>
              ))
            )}
        </div>
      </Row>
    </div>
  );
};


const mapStateToProps = ({ CommentReducer, UserReducer }) => ({
  comments: CommentReducer.comments,
  user: UserReducer.User
});

const PropertyCards = connect(mapStateToProps)(PropCards)

export { PropertyCards };
