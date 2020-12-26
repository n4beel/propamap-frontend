import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typography, Row, Col, Form, Switch } from 'antd';
import { useRouter } from 'next/router';

import { TextBox, TextField, CheckBox, Button, SelectBox } from '../../html';
import { SearchLocation } from '../../pagePartial';
import notification from '../../../utils/services/alert';

import formValidator from '../../../utils/services/formValidator';

const { Title } = Typography;

import './PropertyForm.scss';
import {
  propertyFor,
  rentPropertyType,
  rentalTime,
  genderAllowed,
  sellPropertyType,
  requiredFieldForSell,
  requiredFieldForRent
} from '../../../core/constants/data';

import { PropertyDispatch } from '../../../redux/actions/system';
import site from '../../../core/config/sitemap';
import { AddPropertyAction } from '../../../redux/actions/property';
import { redirect } from '../../../utils/site';

import { PropertyFormImageUpload } from '../';

const PropertyForm = ({
  setProperty,
  property,
  user,
  _onChangePropertyLocation,
  coord
}) => {
  const router = useRouter();

  const initialForm = {
    adTitle: {
      label: 'Ad title',
      placeholder: 'Add property title',
      value: property ? property.title : '',
      id: 'adTitle',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    propertyFor: {
      label: 'Property For',
      placeholder: 'Propery For',
      value: property ? property.property_for : 'rent',
      size: 'large',
      required: true,
      id: 'propertyFor',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    propertyType: {
      label: 'Property Type',
      placeholder: 'Add property type',
      value: property ? property.property_type : [],
      searchable: true,
      size: 'large',
      id: 'propertyType',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    propertyPrice: {
      label: 'Property Price',
      placeholder: 'Add property price',
      min: 0,
      formatter: (value) => `RM ${value}`,
      parser: (value) => value.replace(/R|M|\s?|(,*)/g, ''),
      value: property ? property.price : '',
      id: 'propertyPrice',
      type: 'number',
      onChange: (event) => _onChange(event)
    },
    propertySize: {
      label: 'Property Size (Sq. ft.)',
      placeholder: 'Property Size',
      value: property ? property.space : '',
      min: 0,
      id: 'propertySize',
      type: 'number',
      onChange: (event) => _onChange(event)
    },
    rentalTime: {
      label: 'Rental Time',
      placeholder: 'Rental Time',
      value: property ? (property.rental_time ? property.rental_time : []) : [],
      searchable: true,
      size: 'large',
      id: 'rentalTime',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    studentsAllowed: {
      label: 'Students only',
      title: 'Allowed',
      value: property
        ? property.student_only
          ? property.student_only
          : false
        : false,
      id: 'studentsAllowed',
      onChange: (event) => _onChangeCheckbox(event)
    },
    location: {
      label: 'Location',
      value: property
        ? {
            lat: property.coord.lat,
            lng: property.coord.lon,
            location: { description: property.locationDescription }
          }
        : '',
      id: 'location'
    },
    address: {
      label: 'Address',
      placeholder: 'Address',
      value: property ? property.address : '',
      id: 'address',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    availableImidiately: {
      title: 'Available imidiately',
      value: property ? property.avaialable_immediately : false,
      id: 'availableImidiately'
    },
    genderAllowed: {
      label: 'Gender Allowed',
      placeholder: 'Gender',
      value: property ? property.gender_allowed : [],
      searchable: true,
      size: 'large',
      id: 'genderAllowed',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    images: {
      label: 'Image',
      value: property ? property.images : []
    },
    propertyDetails: {
      label: 'Property Details',
      placeholder: 'Type property details',
      value: property ? property.description : '',
      id: 'propertyDetails',
      type: 'text',
      onChange: (event) => _onChange(event)
    },
    rooms: {
      label: 'Rooms',
      value: property ? property.features.bed_rooms : 0,
      id: 'rooms',
      onChange: (event) => _onChange(event)
    },
    bathrooms: {
      label: 'Bathrooms',
      value: property ? property.features.bath_rooms : 0,
      id: 'bathrRooms',
      onChange: (event) => _onChange(event)
    },
    kitchen: {
      title: 'Kitchen',
      value: property ? property.features.kitchen : false,
      id: 'kitchen',
      onChange: (event) => _onChangeCheckbox(event)
    },
    airConditioner: {
      title: 'Air Conditioner',
      value: property ? property.features.air_condition : false,
      id: 'airConditioner',
      onChange: (event) => _onChangeCheckbox(event)
    },
    internet: {
      title: 'Internet',
      value: property
        ? property.features.internet
          ? property.features.internet
          : false
        : false,
      id: 'internet',
      onChange: (event) => _onChangeCheckbox(event)
    },
    furniture: {
      title: 'Furniture',
      value: property ? property.features.furnished : false,
      id: 'furniture',
      onChange: (event) => _onChangeCheckbox(event)
    },
    carParking: {
      title: 'Car Parking',
      value: property ? property.features.car_parking : false,
      id: 'carParking',
      onChange: (event) => _onChangeCheckbox(event)
    },
    smokingAllowed: {
      title: 'Smoking Allowed',
      value: property
        ? property.features.smoking_allowed
          ? property.features.smoking_allowed
          : false
        : false,
      id: 'smokingAllowed',
      onChange: (event) => _onChangeCheckbox(event)
    },
    livingRoom: {
      title: 'Living Room',
      value: property ? property.features.living_room : false,
      id: 'livingRoom',
      onChange: (event) => _onChangeCheckbox(event)
    },
    electricityBill: {
      title: 'Electricity Bill',
      value: property ? property.includes.electricity : false,
      id: 'electricityBill',
      onChange: (event) => _onChangeCheckbox(event)
    },
    waterBill: {
      title: 'Water Bill',
      value: property ? property.includes.water : false,
      id: 'waterBill',
      onChange: (event) => _onChangeCheckbox(event)
    },
    acceptTermAndPolicy: {
      title: 'I accept privacy policy and terms of use.',
      errorMessage: 'You have to accept terms and privacy policy.',
      value: property ? true : false,
      id: 'acceptTermAndPolicy',
      onChange: (event) => _onChangeCheckbox(event)
    }
  };

  const [propertyForm, setPropertyForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // Events

  const _onChange = (event) => {
    let newForm = propertyForm;
    newForm[event.target.name].value = event.target.value;
    setPropertyForm({ ...newForm });
  };

  const _onChangeCheckbox = (event) => {
    let newForm = propertyForm;
    newForm[event.target.name].value = !event.target.value;
    setPropertyForm({ ...newForm });
  };

  const _onChangeFeatures = (event) => {
    let newForm = propertyForm;
    let features = propertyForm.features.value;
    let value = parseInt(event.target.id, 10);
    let index = features.indexOf(value);
    if (index != -1) {
      features.splice(index, 1);
    } else {
      features = [...features, value];
    }
    newForm.features.value = features;
    setPropertyForm({ ...newForm });
  };

  const _onSubmit = async (eve) => {
    eve.preventDefault();
    if (coord.lat) {
      updatePropertyLocation({
        lat: coord.lat,
        lng: coord.lng,
        location: {
          description: propertyForm.location.value.location.description
        }
      });
    }
    if (!user) {
      notification.error('Login First!');
    } else {
      let newForm = propertyForm;
      for (const field in propertyForm) {
        if (field !== 'propertyFor') newForm[field].required = false;
      }
      await setPropertyForm({ ...newForm });
      if (propertyForm.propertyFor.value == 'rent') {
        let newForm = propertyForm;
        for (const field of requiredFieldForRent) {
          newForm[field].required = true;
        }
        await setPropertyForm({ ...newForm });
      } else if (propertyForm.propertyFor.value == 'sell') {
        let newForm = propertyForm;
        for (const field of requiredFieldForSell) {
          newForm[field].required = true;
        }
        await setPropertyForm({ ...newForm });
      }

      const { isValid, form } = formValidator(propertyForm);
      setPropertyForm({ ...form });
      if (isValid) {
        if (propertyForm.propertyFor.value == 'rent') {
          const property = {
            title: propertyForm.adTitle.value,
            description: propertyForm.propertyDetails.value,
            property_for: propertyForm.propertyFor.value,
            property_type: propertyForm.propertyType.value,
            price: propertyForm.propertyPrice.value,
            rental_time: propertyForm.rentalTime.value,
            student_only: propertyForm.studentsAllowed.value,
            space: propertyForm.propertySize.value,
            coord: {
              lat: propertyForm.location.value.lat,
              lon: propertyForm.location.value.lng
            },
            address: propertyForm.address.value,
            avaialable_immediately: propertyForm.availableImidiately.value,
            gender_allowed: propertyForm.genderAllowed.value,
            features: {
              bed_rooms: propertyForm.rooms.value,
              bath_rooms: propertyForm.bathrooms.value,
              living_room: propertyForm.livingRoom.value,
              air_condition: propertyForm.airConditioner.value,
              furnished: propertyForm.furniture.value,
              internet: propertyForm.internet.value,
              kitchen: propertyForm.kitchen.value,
              car_parking: propertyForm.carParking.value,
              smoking_allowed: propertyForm.smokingAllowed.value
            },
            includes: {
              electricity: propertyForm.electricityBill.value,
              water: propertyForm.waterBill.value
            },
            images: propertyForm.images.value
          };
          saveProperty(property);
        } else {
          const property = {
            title: propertyForm.adTitle.value,
            description: propertyForm.propertyDetails.value,
            property_for: propertyForm.propertyFor.value,
            property_type: propertyForm.propertyType.value,
            address: propertyForm.address.value,
            price: propertyForm.propertyPrice.value,
            avaialable_immediately: propertyForm.availableImidiately.value,
            features: {
              bed_rooms: propertyForm.rooms.value,
              bath_rooms: propertyForm.bathrooms.value,
              living_room: propertyForm.livingRoom.value,
              air_condition: propertyForm.airConditioner.value,
              furnished: propertyForm.furniture.value,
              kitchen: propertyForm.kitchen.value,
              car_parking: propertyForm.carParking.value
            },
            includes: {
              electricity: propertyForm.electricityBill.value,
              water: propertyForm.waterBill.value
            },
            space: propertyForm.propertySize.value,
            coord: {
              lat: propertyForm.location.value.lat,
              lon: propertyForm.location.value.lng
            },
            images: propertyForm.images.value
          };
          saveProperty(property);
        }
      }
    }
  };

  const _onPreview = async (eve) => {
    eve.preventDefault();
    if (coord.lat) {
      updatePropertyLocation({
        lat: coord.lat,
        lng: coord.lng,
        location: {
          description: propertyForm.location.value.location.description
        }
      });
    }
    let newForm = propertyForm;
    for (const field in propertyForm) {
      if (field !== 'propertyFor') newForm[field].required = false;
    }
    await setPropertyForm({ ...newForm });
    if (propertyForm.propertyFor.value == 'rent') {
      let newForm = propertyForm;
      for (const field of requiredFieldForRent) {
        newForm[field].required = true;
      }
      await setPropertyForm({ ...newForm });
    } else if (propertyForm.propertyFor.value == 'sell') {
      let newForm = propertyForm;
      for (const field of requiredFieldForSell) {
        newForm[field].required = true;
      }
      await setPropertyForm({ ...newForm });
    }

    const { isValid, form } = formValidator(propertyForm);
    setPropertyForm({ ...form });
    if (isValid) {
      if (propertyForm.propertyFor.value == 'rent') {
        const property = {
          title: propertyForm.adTitle.value,
          description: propertyForm.propertyDetails.value,
          property_for: propertyForm.propertyFor.value,
          property_type: propertyForm.propertyType.value,
          price: propertyForm.propertyPrice.value,
          rental_time: propertyForm.rentalTime.value,
          student_only: propertyForm.studentsAllowed.value,
          address: propertyForm.address.value,
          locationDescription: propertyForm.location.value.location.description,
          space: propertyForm.propertySize.value,
          coord: {
            lat: propertyForm.location.value.lat,
            lon: propertyForm.location.value.lng
          },
          avaialable_immediately: propertyForm.availableImidiately.value,
          gender_allowed: propertyForm.genderAllowed.value,
          features: {
            bed_rooms: propertyForm.rooms.value,
            bath_rooms: propertyForm.bathrooms.value,
            living_room: propertyForm.livingRoom.value,
            air_condition: propertyForm.airConditioner.value,
            furnished: propertyForm.furniture.value,
            internet: propertyForm.internet.value,
            kitchen: propertyForm.kitchen.value,
            car_parking: propertyForm.carParking.value,
            smoking_allowed: propertyForm.smokingAllowed.value
          },
          includes: {
            electricity: propertyForm.electricityBill.value,
            water: propertyForm.waterBill.value
          },
          images: propertyForm.images.value
        };
        previewProperty(property);
      } else {
        const property = {
          title: propertyForm.adTitle.value,
          description: propertyForm.propertyDetails.value,
          property_for: propertyForm.propertyFor.value,
          property_type: propertyForm.propertyType.value,
          price: propertyForm.propertyPrice.value,
          address: propertyForm.address.value,
          avaialable_immediately: propertyForm.availableImidiately.value,
          locationDescription: propertyForm.location.value.location.description,
          features: {
            bed_rooms: propertyForm.rooms.value,
            bath_rooms: propertyForm.bathrooms.value,
            living_room: propertyForm.livingRoom.value,
            air_condition: propertyForm.airConditioner.value,
            furnished: propertyForm.furniture.value,
            kitchen: propertyForm.kitchen.value,
            car_parking: propertyForm.carParking.value
          },
          includes: {
            electricity: propertyForm.electricityBill.value,
            water: propertyForm.waterBill.value
          },
          space: propertyForm.propertySize.value,
          coord: {
            lat: propertyForm.location.value.lat,
            lon: propertyForm.location.value.lng
          },
          images: propertyForm.images.value
        };
        previewProperty(property);
      }
    }
  };

  const saveProperty = async (property) => {
    setLoading(true);
    const res = await AddPropertyAction(property);
    if (res.result) {
      setProperty(null);
      notification.success('Property Added.');
      redirect(site.routes.viewProperty.route + res.body._id);
    } else {
      notification.error('Fail to submit property!');
    }
    setLoading(false);
  };

  const previewProperty = (property) => {
    setProperty(property);
    redirect(site.routes.previewAdd.path);
  };

  const updateFeatures = (name, value) => {
    if (value > 0) {
      propertyForm.rooms.onChange({
        target: {
          name: name,
          value: propertyForm[name].value + value
        }
      });
    } else if (value < 0) {
      if (propertyForm[name].value > 0)
        propertyForm.rooms.onChange({
          target: {
            name: name,
            value: propertyForm[name].value + value
          }
        });
    }
  };

  const updatePropertyLocation = (value) => {
    const { lat, lng, location } = value;
    let newForm = propertyForm;
    newForm.location.value = { lat, lng, location };
    _onChangePropertyLocation(value);
    setPropertyForm({ ...newForm });
  };

  return (
    <div className='cmp-property-form'>
      <Col xl={12} lg={12} md={24} sm={24}>
        <Row gutter={[16, 16]}>
          <Form onSubmit={_onSubmit} noValidate>
            <Col span={24}>
              <Title level={4}>Add property details</Title>
            </Col>
            <Col span={24}>
              <TextBox {...propertyForm.adTitle} />
            </Col>
            <Col span={24}>
              <SelectBox {...propertyForm.propertyFor} options={propertyFor} />
            </Col>
            {propertyForm.propertyFor.value &&
              propertyForm.propertyFor.value != '' &&
              propertyForm.propertyFor.value == 'rent' && (
                <>
                  <Col xl={8} lg={8} md={8} sm={24}>
                    <SelectBox
                      {...propertyForm.rentalTime}
                      options={rentalTime}
                    />
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={24}>
                    <label>{propertyForm.studentsAllowed.label}</label>
                    <CheckBox
                      {...propertyForm.studentsAllowed}
                      className='students-checkbox'
                    />
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={24}>
                    <SelectBox
                      {...propertyForm.genderAllowed}
                      options={genderAllowed}
                    />
                  </Col>
                </>
              )}
            <Col xl={8} lg={8} md={8} sm={24}>
              <SelectBox
                {...propertyForm.propertyType}
                options={
                  propertyForm.propertyFor.value &&
                  propertyForm.propertyFor.value != ''
                    ? propertyForm.propertyFor.value == 'rent'
                      ? rentPropertyType
                      : sellPropertyType
                    : []
                }
              />
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <TextBox {...propertyForm.propertyPrice} />
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <TextBox {...propertyForm.propertySize} />
            </Col>
            <Col span={24}>
              <label>Location</label>
              <SearchLocation
                initialValue={
                  property
                    ? propertyForm.location.value.location.description
                    : ''
                }
                onSuccess={updatePropertyLocation}
              />
              {propertyForm.location.error ? (
                <div className='invalid-message'>
                  {propertyForm.location.errorComputedMessage}
                </div>
              ) : null}
            </Col>
            <Col span={24}>
              <TextBox {...propertyForm.address} />
            </Col>
            <Col span={24}>
              <label>Available Imidiately</label>
              <div className='switch-button'>
                <Switch
                  id='availableImidiately'
                  onChange={(event) => {
                    const eve = {
                      target: {
                        name: 'availableImidiately',
                        value: !event
                      }
                    };
                    _onChangeCheckbox(eve);
                  }}
                  defaultChecked={propertyForm.availableImidiately.value}
                />
              </div>
            </Col>
            <Col span={12}>
              <label>Images</label>
            </Col>
            <PropertyFormImageUpload
              onChange={_onChange}
              value={propertyForm.images.value}
            />
            <Col span={24}>
              <TextField {...propertyForm.propertyDetails} />
            </Col>
            <Col span={24}>
              <h4 className='features-title'>Features</h4>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24}>
              <div className='feature-option'>
                <div className='feature-label'>
                  <p>Rooms</p>
                </div>
                <div className='feature-input'>
                  <Button
                    icon='minus'
                    inline={true}
                    shape='circle'
                    category='secondary'
                    className='feature-btn'
                    onClick={() => updateFeatures('rooms', -1)}
                  />
                  <span className='feature-value'>
                    {propertyForm.rooms.value}
                  </span>
                  <Button
                    inline={true}
                    icon='plus'
                    shape='circle'
                    category='secondary'
                    // className='feature-btn'
                    onClick={() => updateFeatures('rooms', +1)}
                  />
                </div>
              </div>
              {propertyForm.rooms.error ? (
                <div className='invalid-message'>
                  {propertyForm.rooms.errorComputedMessage}
                </div>
              ) : null}
            </Col>
            <Col xl={12} lg={12} md={12} sm={24}>
              <div className='feature-option'>
                <div className='feature-label'>
                  <p>Bathrooms</p>
                </div>
                <div className='feature-input'>
                  <Button
                    icon='minus'
                    inline={true}
                    shape='circle'
                    category='secondary'
                    className='feature-btn'
                    onClick={() => updateFeatures('bathrooms', -1)}
                  />
                  <span className='feature-value'>
                    {propertyForm.bathrooms.value}
                  </span>
                  <Button
                    inline={true}
                    icon='plus'
                    shape='circle'
                    category='secondary'
                    onClick={() => updateFeatures('bathrooms', +1)}
                  />
                </div>
              </div>
              {propertyForm.bathrooms.error ? (
                <div className='invalid-message'>
                  {propertyForm.bathrooms.errorComputedMessage}
                </div>
              ) : null}
            </Col>
            <Col xl={8} lg={12} md={12} sm={12}>
              <CheckBox
                className='feature-checkbox'
                {...propertyForm.kitchen}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12}>
              <CheckBox
                className='feature-checkbox'
                {...propertyForm.airConditioner}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12}>
              <CheckBox
                className='feature-checkbox'
                {...propertyForm.furniture}
              />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12}>
              <CheckBox
                {...propertyForm.carParking}
                className='feature-checkbox'
              />
            </Col>
            {propertyForm.propertyFor.value &&
              propertyForm.propertyFor.value != '' &&
              propertyForm.propertyFor.value == 'rent' && (
                <>
                  <Col xl={8} lg={12} md={12} sm={12}>
                    <CheckBox
                      {...propertyForm.internet}
                      className='feature-checkbox'
                    />
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12}>
                    <CheckBox
                      className='feature-checkbox'
                      {...propertyForm.smokingAllowed}
                    />
                  </Col>
                </>
              )}
            <Col xl={8} lg={12} md={12} sm={12}>
              <CheckBox
                className='feature-checkbox'
                {...propertyForm.livingRoom}
              />
            </Col>
            <Col span={24}>
              <h4 className='features-title'>Including</h4>
            </Col>
            <Col span={12}>
              <CheckBox
                className='feature-checkbox'
                {...propertyForm.electricityBill}
              />
            </Col>
            <Col span={12}>
              <CheckBox
                className='feature-checkbox'
                {...propertyForm.waterBill}
              />
            </Col>
            <Col span={24}>
              <CheckBox
                {...propertyForm.acceptTermAndPolicy}
                className='privacy-policy-checkbox'
              />
            </Col>
            <Col sm={24} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Button
                type='submit'
                loading={loading}
                onClick={_onSubmit}
                title='SUBMIT PROPERTY'
                size='large'
                category='primary'
                className='property-submit-btn'
              />
            </Col>
            <Col
              sm={24}
              md={{ span: 8, offset: 8 }}
              lg={{ span: 8, offset: 8 }}
              xl={{ span: 8, offset: 8 }}>
              <Button
                onClick={_onPreview}
                title='PREVIEW PROPERTY'
                size='large'
                category='primary'
                className='property-submit-btn'
              />
            </Col>
          </Form>
        </Row>
      </Col>
    </div>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  property: UserReducer.Property,
  user: UserReducer.User
});

const mapDispatchToProps = (dispatch) => ({
  setProperty: (property) => dispatch(PropertyDispatch(property))
});

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyForm);

export { connectedComponent as PropertyForm };
