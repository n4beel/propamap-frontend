import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Menu, Tooltip, Dropdown, Modal } from "antd";

import { SignOutAction, connectSocket } from "../../../redux/actions/account";
import { redirect } from "../../../utils/site";
import site from "../../../core/config/sitemap";

import "./TopNav.scss";
import { Icon, Button, TextBox } from "../../html";
import { SignupForm, LoginForm } from "../../home";
import formValidator from "../../../utils/services/formValidator";
import { UserDispatch, SearchPropertyDispatch, SearchPropertyCountDispatch } from "../../../redux/actions/system";
import cookie from "../../../utils/services/cookie";
import { COOKIE_IDENTIFIER } from "../../../core/constants/auth";
import { searchPropertyByTerm } from "../../../redux/actions/property";

const { Item } = Menu;

const TopNav = ({ route, user, setUser ,setSearchProperty ,setCount }) => {
  const initialForm = {
    propertyName: {
      label: "Search",
      showLabel: false,
      placeholder: "Type keywords",
      value: "",
      required: true,
      id: "propertyName",
      type: "search",
      onPressEnter: () => {
        quickSearchForm.propertyName.onSearch()
      },
      onSearch: async () => {
        const res = await searchPropertyByTerm(quickSearchForm.propertyName.value)
        if(res.result){
          setSearchProperty(res.body);
          setCount(res.count);
          redirect('/properties/search');
        }
        else{
          notification.error(res.message || 'Something went wrong!');
        }
      },
      onChange: (event) => _onChange(event),
    },
  };

  const [quickSearchForm, setQuickSearchForm] = useState(initialForm);
  const [checkSocketConnection, setConnection] = useState(true);

  useEffect(() => {
    console.log("userssss --->", user);
    const token = cookie.get(COOKIE_IDENTIFIER);
    console.log("token -->", token);
    if (token && checkSocketConnection) {
      setConnection(false);
      connectSocket(token);
    }
  }, [user]);

  // Events

  const _onChange = (event) => {
    let newForm = quickSearchForm;
    newForm[event.target.name].value = event.target.value;
    setQuickSearchForm({ ...newForm });
  };

  const _onSubmit = (eve) => {
    eve.preventDefault();
    const { isValid, form } = formValidator(quickSearchForm);
    setQuickSearchForm({ ...form });
    console.log("form", form);
    if (isValid) {
    }
  };

  const [modalState, setModalState] = useState(false);
  const [login, setLogin] = useState(true);

  // Events

  const _onClickOpenModal = () => {
    setModalState(true);
  };

  const _onSuccess = async () => {
    setModalState(false);
  };

  const _onClickCloseModal = () => {
    setModalState(false);
  };

  const _onToggleFormView = () => {
    setLogin(!login);
  };

  const userProfileDropdown = (
    <Menu>
      {/* <Item
        key='subscription'
        onClick={() => redirect("/subscription")}>
        <span>Subscription</span>
      </Item> */}
      <Item key="settings" onClick={() => redirect("/settings")}>
        <span>Settings</span>
      </Item>
      <Item
        key="logout"
        onClick={async () => {
          await SignOutAction();
          setUser(null);
          redirect("/")
        }}
      >
        <span>Logout</span>
      </Item>
    </Menu>
  );

  return (
    <div className="partial-top-nav">
      <Menu
        mode="horizontal"
        overflowedIndicator={
          <Icon
            className="menu-icon-help"
            type="solid"
            size="1.5"
            icon="bars"
          />
        }
      >
        <Item>
          <Link href={site.routes.dashboard.path}>
            <img src="/images/logo.png" className="logo clickable" />
          </Link>
        </Item>
        <Item className="navbar-search">
          <div className={route.navKey === "dashboard" ? "hidden" : ""}>
            <TextBox {...quickSearchForm.propertyName} />
          </div>
        </Item>
        <Item>
          <Link href={site.routes.addProperty.path}>
            <Button title="ADD PROPERTY" category="primary" />
          </Link>
        </Item>
        {/* <Item>
          <a>Buy</a>
        </Item>
        <Item>
          <a>Rent</a>
        </Item> */}
        <Item onClick={() => redirect("/subscription")}>
          <a className="plans">Plans</a>
        </Item>
        {user && (
          <Item onClick={() => redirect("/messages")}>
            <Tooltip placement="bottom" title="Messages">
              <span>
                <Icon
                  className="menu-item-icon"
                  type="regular"
                  size="1.5"
                  icon="envelope"
                />
              </span>
            </Tooltip>
          </Item>
        )}
        {user && (
          <Item onClick={() => redirect("/favourites")}>
            <Tooltip placement="bottom" title={"Favourites"}>
              <span>
                <Icon
                  className="menu-item-icon"
                  type="regular"
                  size="1.5"
                  icon="heart"
                />
              </span>
            </Tooltip>
          </Item>
        )}
        {user && (
          <Item>
            <Dropdown
              overlay={userProfileDropdown}
              trigger={["click"]}
              placement="bottomRight"
            >
              <span className="menu-item-icon">
                <Icon type="regular" size="1.5" icon="user" />
              </span>
            </Dropdown>
          </Item>
        )}
        {!user && (
          <Item>
            <Button
              category="primary"
              title={`Sign In`}
              onClick={_onClickOpenModal}
            />
          </Item>
        )}
      </Menu>
      <Modal visible={modalState} onCancel={_onClickCloseModal} footer={null}>
        {login ? (
          <LoginForm
            closeModal={_onClickCloseModal}
            onSuccess={_onSuccess}
            onUpdate={_onToggleFormView}
            visible={modalState}
          />
        ) : (
          <SignupForm
            closeModal={_onClickCloseModal}
            onSuccess={_onSuccess}
            onUpdate={_onToggleFormView}
          />
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  user: UserReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(UserDispatch(user)),
  setSearchProperty: (body) => dispatch(SearchPropertyDispatch(body)),
  setCount: (count) => dispatch(SearchPropertyCountDispatch(count))
});

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(TopNav);

export { connectedComponent as TopNav };
