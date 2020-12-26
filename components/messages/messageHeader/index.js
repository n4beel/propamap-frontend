import React from "react";
import { Row, Col, Badge } from "antd";
// import room from "../../public/images/room.jpg"
import "./messageHeader.scss";
import moment from "moment"

const MessageHeader = (props) => {
  console.log('property details -->',props)
  const property = props.property.length && props.property[0].property
  let user_name;
  let profile_picture;
  !!props.property.length && props.property[0].users.forEach((element) => {
    if (element._id != props.user._id) {
      user_name = element.user_name;
      profile_picture = element.profile_picture;
    }
  });
  return (
    <>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={21} className="avatarContain descriptionContain">
            <img src={property.images && property.images[0]} className="avatar" />
            <div>
              <h3 className="description">{property.title}</h3>
              <p className="time">
                {moment(property.createdAt).format('lll')} - {property.address}
            </p>
            </div>
          </Col>
          <Col span={3} className="header-avatar">
            <div className="avatar-cont">

              <div className="avatar">
                <img src={profile_picture ? profile_picture : "/images/avatar.jpg"} alt="" />
              </div>
              <div className="name">{user_name}</div>
            </div>
          </Col>
        </Row>
      </Col>
      {/* <Col xl={6} lg={6} md={6} sm={6}>
        {props.isOwner ? (
          <Row>
            <Col xl={6} lg={6} md={6} sm={6}>
              <img src="/images/room.jpg" className="userAvatar" />
            </Col>
            <Col xl={18} lg={18} md={18} sm={18} className="userInfo">
              <p className="username">Emmar Holding</p>
              <p className="year">
                450 <span style={{ color: "black" }}>AD</span>
              </p>
              <p className="time">Joined 27 July 2025</p>
            </Col>
          </Row>
        ) : (
          <Row>
            <p className="open" >Open chats</p>
          </Row>
        )}
      </Col> */}
      <Col xl={24} lg={24} md={24} sm={24} className="divider"></Col>
    </>
  );
};

export default MessageHeader;
