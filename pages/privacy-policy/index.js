import React from 'react'
import { Row, Col, Tabs } from 'antd';
import './TermsConditions.scss';
import Title from 'antd/lib/typography/Title';
import site from '../../core/config/sitemap';
import AppLayout from '../../layouts/AppLayout';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Privacy = (props) => {

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="terms">
            <Title level={4}>Privacy Policy</Title>

            <div className="list">
              <div className="list-item">
                <div className="serial">1.</div>
                <div className="content">
                  <div className="heading">Privacy Introduction</div>
                  <div className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo repellendus deleniti debitis dolore dignissimos dolorum possimus adipisci, ullam aliquam amet magnam repudiandae, cupiditate autem, a saepe vero quas eaque quaerat...
                        <span className="more">Learn More</span>
                  </div>
                </div>
              </div>
              <div className="list-item">
                <div className="serial">2.</div>
                <div className="content">
                  <div className="heading">Privacy Introduction</div>
                  <div className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo repellendus deleniti debitis dolore dignissimos dolorum possimus adipisci, ullam aliquam amet magnam repudiandae, cupiditate autem, a saepe vero quas eaque quaerat...
                        <span className="more">Learn More</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Col>

      </Row >

    </div >
  )
}

Privacy.getLayout = page => {
  return <AppLayout route={site.routes.Privacy}>{page}</AppLayout>;
};


export default Privacy
