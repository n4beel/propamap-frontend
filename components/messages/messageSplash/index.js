import React from "react";
import { Row, Col, Badge } from "antd";
// import room from "../../public/images/room.jpg"
import "./messageSplash.scss";

const MessageSplash = (props) => {
  return (
    <>
      <Col span={24} className="messageSplash">
        <div className="splash">
          <img src="/images/splash.png" alt="" className="image" />
          <div className="heading">Welcome to Propamap Chat</div>
          <div className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque asperiores non tempore nihil illo qui dolores assumenda ex consectetur architecto ipsa magni molestias vero, placeat dolor? Quaerat, dolores? Nostrum, earum.
          </div>
        </div>
      </Col>
    </>
  );
};

export default MessageSplash;
