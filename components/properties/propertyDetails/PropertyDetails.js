import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Col, Row, Divider, Tag, Typography } from "antd";
import Disqus from "disqus-react";

import "./PropertyDetails.scss";
import Comment from "../comment/Comment";
import { Icon, Button } from "../../html";
import { ImageSlider, ViewPageCard } from "../../pagePartial";

import site from "../../../core/config/sitemap";
import notification from "../../../utils/services/alert";
import capitalize from "../../../utils/helpers/stringHelper";
import { PropertyDispatch } from "../../../redux/actions/system";
import { dateFormatter } from "../../../utils/helpers/dateFormatter";
import { CommentInput as Input } from "../../chat/messageInput";

import { redirect } from "../../../utils/site";
import { AddPropertyAction } from "../../../redux/actions/property";

const { Title } = Typography;

const PropertyDetails = (props) => {
  
  const router = useRouter(props);
  const disqusShortname = "propamap";
  const disqusConfig = {
    url: `${props.completeUrl}/${props._id}`,
    identifier: props._id,
    title: props.title,
  };

  const _edit = () => {
    router.push(site.routes.addProperty.path);
  };

  const _save = async () => {
    if (!props.user) {
      notification.error("Login First!");
    } else {
      const res = await AddPropertyAction(props.property);
      if (res.result) {
        props.setProperty(null);
        notification.success("Property Added.");
        redirect(site.routes.viewProperty.route + res.body._id);
      } else {
        notification.error("Fail to submit property!");
      }
    }
  };


  return (
    <div className="cmp-property-details">
      <Row className="slider">
        <ImageSlider images={props.property.images} />
      </Row>
      <Row>
        <div className="property-title-rent">
          <Col xl={8} md={12} lg={12} sm={24}>
            <h2 className="property-title">{props.property.title}</h2>
          </Col>
          <Col
            xl={{ span: 8, offset: 8 }}
            lg={{ span: 6, offset: 6 }}
            md={{ span: 6, offset: 6 }}
            sm={24}
          >
            <h2 className="property-rent">RM {props.property.price}</h2>
          </Col>
        </div>
      </Row>
      <Row>
        <div className="property-timings">
          <h4>
            {dateFormatter(
              props.preview ? Date.now() : props.property.updatedAt,
              true
            )}
          </h4>
          <h4>-</h4>
          <h4>ID #123456</h4>
          {!props.preview && <h4>-</h4>}
          {!props.preview && <h4>{props.property.agent.country}</h4>}
          {!props.preview && <h4>{props.property.agent.city}</h4>}
        </div>
      </Row>
      {props.property.avaialable_immediately && (
        <Row gutter={16}>
          <Col xl={4} lg={6} md={8} sm={24} xs={24}>
            <Button
              title="Available now"
              className="detail-button email-button  available-btn"
              block={true}
            />
          </Col>
        </Row>
      )}
      <Row>
        <div className="property-address">{props.property.address}</div>
      </Row>
      <Row>
        <div className="property-description">{props.property.description}</div>
      </Row>
      <ViewPageCard
        content={[
          {
            title: "Property Type",
            description: <Tag>{capitalize(props.property.property_type)}</Tag>,
          },
          {
            title: "Property For",
            description: <Tag>{capitalize(props.property.property_for)}</Tag>,
          },
        ]}
      />

      <Row>
        {props.property.property_for.toLowerCase() === "rent" && (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[34, 8]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4} className="icon-col">
                  <img src="/images/bisexual.svg" className="icon-img" />
                  {/* <Icon icon='bed' type='solid' size='1' /> */}
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Gender</p>
                    <p className="feature-quantity">
                      {props.property.gender_allowed &&
                        capitalize(props.property.gender_allowed)}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        )}
        {props.property.property_for.toLowerCase() === "rent" && (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[34, 8]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4} className="icon-col">
                  <img src="/images/knowledge.svg" className="icon-img" />
                  {/* <Icon icon='bed' type='solid' size='1' /> */}
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Students Allowed</p>
                    <p className="feature-quantity">
                      {props.property.student_only ? "Yes" : "No"}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        )}
        {props.property.features.bed_rooms ? (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[32, 16]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                  <img src="/images/bed.svg" className="icon-img" />
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Rooms</p>
                    <p className="feature-quantity">
                      {props.property.features.bed_rooms}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        ) : null}
        {props.property.features.bath_rooms ? (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[32, 16]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                  <img src="/images/bathtub.svg" className="icon-img" />
                  {/* <Icon icon='bath' type='solid' size='1' /> */}
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Bathrooms</p>
                    <p className="feature-quantity">
                      {props.property.features.bath_rooms}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        ) : null}
        <Col xl={8} md={12} sm={24}>
          <div className="property-features">
            <Row gutter={[32, 16]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                <img src="/images/kitchen.svg" className="icon-img" />
                {/* <Icon icon='bath' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className="property-features-details">
                  <p className="feature-name">Kitchen</p>
                  <p className="feature-quantity">
                    {props.property.features.kitchen ? "" : "Not"} Available
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {props.property.features.living_room ? (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[32, 16]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                  <img src="/images/armchair.svg" className="icon-img" />
                  {/* <Icon icon='couch' type='solid' size='1' /> */}
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Living room</p>
                    <p className="feature-quantity">
                      {props.property.features.living_room}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        ) : null}
        <Col xl={8} md={12} sm={24}>
          <div className="property-features">
            <Row gutter={[32, 16]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                <img src="/images/air-conditioner.svg" className="icon-img" />
                {/* <Icon icon='bath' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className="property-features-details">
                  <p className="feature-name">Air conditioner</p>
                  <p className="feature-quantity">
                    {props.property.features.air_condition ? "" : "Not"}{" "}
                    Available
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {props.property.property_for.toLowerCase() === "rent" && (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[32, 16]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                  <img src="/images/wifi.svg" className="icon-img" />
                  {/* <Icon icon='bath' type='solid' size='1' /> */}
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Internet</p>
                    <p className="feature-quantity">
                      {props.property.features.internet ? "" : "Not"} Available
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        )}
        <Col xl={8} md={12} sm={24}>
          <div className="property-features">
            <Row gutter={[32, 16]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                <img src="/images/couch.svg" className="icon-img" />
                {/* <Icon icon='bath' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className="property-features-details">
                  <p className="feature-name">Furniture</p>
                  <p className="feature-quantity">
                    {props.property.features.furnished ? "Yes" : "No"}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={8} md={12} sm={24}>
          <div className="property-features">
            <Row gutter={[32, 16]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                <img src="/images/parking.svg" className="icon-img" />
                {/* <Icon icon='bath' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className="property-features-details">
                  <p className="feature-name">Car Parking</p>
                  <p className="feature-quantity">
                    {props.property.features.car_parking ? "" : "Not"} Available
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {props.property.property_for.toLowerCase() === 'rent' && (
          <Col xl={8} md={12} sm={24}>
            <div className="property-features">
              <Row gutter={[32, 16]}>
                <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                  <img src="/images/smoke.svg" className="icon-img" />
                  {/* <Icon icon='bath' type='solid' size='1' /> */}
                </Col>
                <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                  <div className="property-features-details">
                    <p className="feature-name">Smoking</p>
                    <p className="feature-quantity">
                      {props.property.features.smoking_allowed ? "" : "Not"}{" "}
                      Allowed
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        )}
        <Col xl={8} md={12} sm={24}>
          <div className="property-features">
            <Row gutter={[34, 8]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4} className="icon-col">
                <img src="/images/measuring-tape.svg" className="icon-img" />
                {/* <Icon icon='bed' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className="property-features-details">
                  <p className="feature-name">SQF</p>
                  <p className="feature-quantity">{props.property.space}</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {/* {props.property.property_for.toLowerCase() === 'rent' && ( */}
        <Col xl={8} md={12} sm={24}>
          <div className='property-features'>
            <Row gutter={[32, 16]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                <img src='/images/thunder.svg' className='icon-img' />
                {/* <Icon icon='bath' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className='property-features-details'>
                  <p className='feature-name'>Electricity bill</p>
                  <p className='feature-quantity'>
                    {props.property.includes.electricity ? 'Yes' : 'No'}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {/* )} */}
        {/* {props.property.property_for.toLowerCase() === 'rent' && ( */}
        <Col xl={8} md={12} sm={24}>
          <div className='property-features'>
            <Row gutter={[32, 16]}>
              <Col xl={4} lg={4} md={4} sm={3} xs={4}>
                <img src='/images/water.svg' className='icon-img' />
                {/* <Icon icon='bath' type='solid' size='1' /> */}
              </Col>
              <Col xl={20} lg={20} md={20} sm={21} xs={20}>
                <div className='property-features-details'>
                  <p className='feature-name'>Water bill</p>
                  <p className='feature-quantity'>
                    {props.property.includes.water ? 'Yes' : 'No'}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        {/* )} */}
      </Row>
      <Row>
        <div className="details-footer">
          <Divider className="top-divider" />
          <div className="footer-details">
            <div className="share-ad">Share Ad</div>
            <div className="report-ad">
              <Icon icon="exclamation-circle" />
              Report Ad
            </div>
          </div>
          <Divider className="bottom-divider" />
        </div>
      </Row>
      <Row>
        <Title level={4}>Add comment</Title>
        <div className="comment-input">
          <Input onClick={props.onSubmit} value={props.comment} onChange={props.onCommentChange} />
        </div>
        <Divider className="bottom-divider" />
      </Row>
      <Row>
        <Title level={4}>
        Comments <span className="comments-count">{`(${props.comments.length || 0})`}</span>
        </Title>
        <div className="comments-contain">
          <Comment
            onReplyChange={props.onReplyChange}
            onEditChange={props.onEditChange}
            onSubmit={props.onSubmitReply}
            onReplyClick={props.onReplyClick}
            onEditClick={props.onEditClick}
            showReplyBox={props.replyBox}
            showEditBox={props.editBox}
            comments={props.comments}
            reply={props.reply}
            edit={props.edit}
            onEditSubmit={props.onEditSubmit}
          />
        </div>
      </Row>
      {/* {!props.preview && (
        <div className='disqus-comment'>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      )} */}
      {/* {props.preview && (
        <Row>
          <Col span={8}>
            <Button
              title='Submit'
              size='large'
              category='primary'
              block
              onClick={_save}></Button>
          </Col>
          <Col span={8} offset={8}>
            <Button
              title='Edit'
              size='large'
              category='primary'
              block
              onClick={_edit}></Button>
          </Col>
        </Row>
      )} */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProperty: (property) => dispatch(PropertyDispatch(property)),
});

const connectedComponent = connect(null, mapDispatchToProps)(PropertyDetails);

export { connectedComponent as PropertyDetails };
