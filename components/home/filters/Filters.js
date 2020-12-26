import React from 'react';
import { Form, Row, Col } from 'antd';

import './Filters.scss';

import { CheckBox, Button, TextBox } from '../../html';


const Filters = props => {

  const handleSubmit = () => {
    console.log("submit")
  }

  const onChange = () => {
    console.log("Hello")
  }

  const classes = props.filters ? 'cmp-filters' : 'cmp-filters disabled';

  console.log('props -->',props)
  return (
    <div className={classes}>
      <Form onSubmit={handleSubmit} noValidate>
        <Row className="row" gutter={[16, 16]}>
          <Col span={24}>
            <label>By Property Features</label>

          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="checkbox">
              <CheckBox
                title='Available Immediately'
                {...props.avaialable_immediately}
                className='privacy-policy-checkbox'
              />
            </div>
            <div className="checkbox">
              <CheckBox
                title='Students Only'
                {...props.student_only}
                className='privacy-policy-checkbox'
              />
            </div>
            <div className="checkbox">
              <CheckBox
                title='Water Bill'
                {...props.includes_water}
                className='privacy-policy-checkbox'
              />
            </div>

          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={12}>
            <div className="checkbox">
              <CheckBox
                title='Kitchen'
                {...props.kitchen}
                className='privacy-policy-checkbox'
              />
            </div>
            <div className="checkbox">
              <CheckBox
                title='Living Room'
                {...props.living_room}
                className='privacy-policy-checkbox'
              />
            </div>
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={12}>

            <div className="checkbox">
              <CheckBox
                title='Air conditioner'
                {...props.aircondition}
                className='privacy-policy-checkbox'
              />
            </div>
            <div className="checkbox">
              <CheckBox
                title='Internet'
                {...props.internet}
                className='privacy-policy-checkbox'
              />
            </div>
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={12}>


            <div className="checkbox">
              <CheckBox
                title='Furniture'
                {...props.furniture}
                className='privacy-policy-checkbox'
              />
            </div>
            <div className="checkbox">
              <CheckBox
                title='Car Parking'
                {...props.car_parking}
                className='privacy-policy-checkbox'
              />
            </div>
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={12}>


            <div className="checkbox">
              <CheckBox
                title='Smoking Allowed'
                {...props.smoking}
                className='privacy-policy-checkbox'
              />
            </div>
            <div className="checkbox">
              <CheckBox
                title='Electricity Bill'
                {...props.electricity}
                className='privacy-policy-checkbox'
              />
            </div>
          </Col>
          <Col xl={4} lg={4} md={8} sm={12} xs={12} style={{ padding: 0 }}>
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
                  onClick={() => props.rooms.onChange({target:{name:"rooms",value:props.rooms.value ? props.rooms.value-1 : props.rooms.value}})}
                />
                <span className='feature-value'>
                  {props.rooms.value}
                </span>
                <Button
                  inline={true}
                  icon='plus'
                  shape='circle'
                  category='secondary'
                  // className='feature-btn'
                  onClick={() => props.rooms.onChange({target:{value: props.rooms.value+1,name:"rooms"}})}
                />
              </div>
            </div>
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
                  onClick={() => props.bathrooms.onChange({target:{name:"bathrooms",value:props.bathrooms.value ? props.bathrooms.value-1 : props.bathrooms.value}})}
                />
                <span className='feature-value'>
                  {props.bathrooms.value}
                </span>
                <Button
                  inline={true}
                  icon='plus'
                  shape='circle'
                  category='secondary'
                  onClick={() => props.bathrooms.onChange({target:{value: props.bathrooms.value+1,name:"bathrooms"}})}
                />
              </div>
            </div>

          </Col>
          <Col span={24}>
            <label>By Price</label>
          </Col>
          <Col span={5} >
          <TextBox  {...props.min} />
          </Col>
          <Col span={5} >
          <TextBox {...props.max} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filters;
