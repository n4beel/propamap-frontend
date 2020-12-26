import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import AppLayout from '../../layouts/AppLayout';

import './styles/add.scss';

import { MapContainer } from '../../components/pagePartial';
import { PropertyForm } from '../../components/properties';

import site from '../../core/config/sitemap';

const AddProperty = ({ property }) => {
  const [location, setLocation] = useState(
    property
      ? {
          lat: property.coord.lat,
          lng: property.coord.lon,
          location: { description: property.locationDescription }
        }
      : ''
  );

  const [coord, setCoord] = useState({});

  const _onChangePropertyLocation = (value) => {
    const { lat, lng, location } = value;
    let newForm = location;
    newForm = { lat, lng, location };
    setLocation(newForm);
  };

  const _onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setLocation({ lat, lng });
    setCoord({ lat, lng });
  };

  return (
    <div className='page-add-property'>
      <Row gutter={[24, 24]}>
        <PropertyForm
          _onChangePropertyLocation={_onChangePropertyLocation}
          coord={coord}
        />
        <Col xl={12} lg={12} md={24} sm={24}>
          <MapContainer
            showSearch={false}
            defaultLocation={location}
            defaultName={location.location ? location.location.description : ''}
            draggable={true}
            onDragend={_onMarkerDragEnd}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  property: UserReducer.Property
});

AddProperty.getLayout = (page) => {
  return <AppLayout route={site.routes.addProperty}>{page}</AppLayout>;
};

export default connect(mapStateToProps, null)(AddProperty);
