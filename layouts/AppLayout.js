import { useState, useEffect } from "react";
import { Layout as AntLayout, Icon } from "antd";
import socketIoClient from "socket.io-client";

import Layout from './main';
import { TopNav, Breadcrumb, Footer } from '../components/pagePartial';

import alert from "../utils/services/alert";
import site from "../core/config/sitemap";
import config from "../core/config";

import "./styles/AppLayout.scss";
import { redirect } from "../utils/site";
import { connect } from "react-redux";
import { TryLogInAction } from "../redux/actions/account";
import { UserDispatch } from "../redux/actions/system";

const { Header, Content, Footer: AntFooter } = AntLayout;

const SIDER_OPENED_WIDTH = 200;
const SIDER_COLLAPSED_NONBROKEN_WIDTH = 80;
const SIDER_COLLAPSED_BROKEN_WIDTH = 0;

const AppLayout = ({ route, roles, redirectUrl, children, setUser }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [collapsedWidth, setCollapsedWidth] = useState(
    SIDER_COLLAPSED_NONBROKEN_WIDTH
  );

  let socket = null;

  useEffect(() => {
    authN();
  }, []);

  useEffect(() => {
    if (!firstLoad) authN();
  }, [children]);

  const _onToggleCollapse = e => {
    setCollapsed(!collapsed);
  };

  // Utils

  const authN = async () => {
    try {
      setReady(false);
      const res = await TryLogInAction();
      if (res.result) setUser(res.body);
      setFirstLoad(false);
      setReady(true);
    } catch (err) {
      // redirect(site.routes.signIn.path);
    }
  };

  const getBreadcrumbProps = {
    module: route.module,
    page: {
      name: route.title,
      url: route.path,
      isIndex: route.isIndex || false
    }
  };

  return !firstLoad ? (
    <Layout route={route}>
      <AntLayout style={{ minHeight: "100vh" }}>
        <AntLayout>
          <Header className="layout-header">
            {/* <div
              className='container'
              style={{
                paddingLeft: collapsed ? collapsedWidth : SIDER_OPENED_WIDTH,
                transition: 'padding-left 0.2s'
              }}
            > */}
            <TopNav
              route={route}
              isSideNavCollapsed={collapsed}
              onToggleCollapse={_onToggleCollapse}
            />
            {/* </div> */}
          </Header>

          <AntLayout
            style={{
              marginTop: 64
              // marginLeft: collapsed ? collapsedWidth : SIDER_OPENED_WIDTH,
              // transition: 'margin-left 0.2s'
            }}
          >
            <Content className="layout-content">
              <Breadcrumb {...getBreadcrumbProps} />
              {ready ? (
                children
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Icon type="loading" style={{ fontSize: 32 }} />
                </div>
              )}
            </Content>
            <AntFooter className='layout-footer'>
              <Footer />
            </AntFooter>
          </AntLayout>
        </AntLayout>
      </AntLayout>
    </Layout>
  ) : null;
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(UserDispatch(user))
});

export default connect(null, mapDispatchToProps)(AppLayout);
