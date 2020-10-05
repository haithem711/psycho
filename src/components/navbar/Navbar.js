import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Menu,
  Avatar,
  Input,
  Typography,
  Button,
  Dropdown,
  Popconfirm,
  Icon,
    Affix
} from "antd";
import { withRouter, Link, NavLink } from "react-router-dom";
import { Motion, spring } from "react-motion";
import { logout } from "../../actions/auth-actions/actions";
import "./menu-drawer.scss";
import "./navbar.scss";
import { backUrl } from "../../config/api";
import {
  loadingPageAction,
  hideProgressBar
} from "../../actions/global-status-actions/actions";

import { fetchAdvisors, clearAdvisors } from "../../actions/advisors-actions/actions";
const Navbar = props => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  useEffect(() => {

    props.history.listen(() => {
      setTimeout(() => {
        setDrawerOpened(false);
      }, 300);
    });
  }, [props.history]);
  return (
    <Affix offsetTop={0}><header className={"navbar"}>
      <div className="navbar-section navbar-left">
        <Link to={"/"}>
          <Typography.Title className="navbar-brand" level={3}>
            COPSYCHO.
          </Typography.Title>
        </Link>
        <Input.Search
          placeholder="Search for..."
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <div
          className={"menu-hamburger"}
          onClick={() => setDrawerOpened(!drawerOpened)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="navbar-section navbar-right">
        <div className={"menu-navbar"}>
          <NavLink exact activeClassName={"active"} to={"/"}>
            Home
          </NavLink>
          <NavLink activeClassName={"active"} to={"/articles"}>
            Articles
          </NavLink>
          <NavLink activeClassName={"active"} to={"/horoscopes"}>
            Horoscopes
          </NavLink>
          <NavLink activeClassName={"active"} to={"/questions"}>
            Q/A
          </NavLink>
        </div>
        <Dropdown
          placement={"bottomRight"}
          overlay={
            props.isLoggedIn === true ? (
              <Menu>
                <Menu.Item key="083cdsc3">
                  <Popconfirm
                    icon={<Icon type="logout" />}
                    placement="leftBottom"
                    title={"Do you really want to logout ?"}
                    onCancel={event => event.preventDefault()}
                    onConfirm={async () => {
                      props.loadingPageAction();
                      await props.clearAdvisors();
                      await props.logout();
                      await props.fetchAdvisors("/users/advisors");
                      props.hideProgressBar();
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div onClick={event => event.preventDefault()}>
                      <Icon type={"logout"} /> Logout
                    </div>
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="dcs3">
                  <Link to={`/profile/${props.user.id}`}>
                    {" "}
                    <Icon type={"user"} /> My Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={`/messenger/`}>
                    <Icon type={"wechat"} /> My Chats
                  </Link>
                </Menu.Item>
              </Menu>
            ) : (
              <Menu>
                <Menu.Item key="3">
                  <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="0">
                  <Link to="/signup">Sign Up</Link>
                </Menu.Item>
              </Menu>
            )
          }
          trigger={["click"]}
        >
          {props.isLoggedIn === true ? (
            <button className="user-drop-down">
                <Typography.Text style={{color:'white', fontWeight:"600"}}>{" " + props.user.first_name +" "}</Typography.Text>
              <Avatar
                size={30}
                icon="user"
                className={"avatar-pic"}
                src={
                  props.user.avatar_url
                    ? backUrl + "/storage/" + props.user.avatar_url
                    : null
                }
              />
              <Icon type={"down"} className={"arrow-down"} />
            </button>
          ) : (
            <>
              <NavLink
                activeClassName={"active"}
                to={"/login"}
                className={"au-link"}
                style={{
                  marginRight: "5px"
                }}
              >
                Login{" "}
              </NavLink>{" "}
              <p> | </p>{" "}
              <NavLink
                activeClassName={"active"}
                className={"au-link"}
                to={"/signup"}
                style={{
                  marginLeft: "5px"
                }}
              >
                {" "}
                Sign Up
              </NavLink>
            </>
          )}
        </Dropdown>
      </div>
      <Motion style={{ x: spring(drawerOpened ? 0 : 100) }}>
        {({ x }) => (
          <div
            className={"menu-drawer"}
            style={{
              WebkitTransform: `translate3d(${x}%, 0, 0)`,
              transform: `translate3d(${x}%, 0, 0)`,
              boxShadow: drawerOpened
                ? "-7px 10px 13px -7px rgba(38, 38, 38, 0.72)"
                : "none"
            }}
          >
            <div className={"menu-navs"}>
              <NavLink exact to={"/"} key="1">
                Home
              </NavLink>
              <NavLink to={"/articles"} key="2">
                Articles
              </NavLink>
              <NavLink to={"/horoscopes"} key="3">
                Horoscopes
              </NavLink>
              <NavLink to={"/questions"} key="4">
                Q/A
              </NavLink>
            </div>

            {props.isLoggedIn === true ? (
              <div className={"avatar-logout"}>
                <Link to={`/profile/${props.user.id}`}>

                    <Typography.Text style={{color:'white',  fontWeight:"600"}}>{" " + props.user.first_name +" "}</Typography.Text>
                  <Avatar
                    size={30}
                    icon="user"
                    className={"avatar-pic"}
                    src={
                      props.user.avatar_url
                        ? backUrl + "/storage/" + props.user.avatar_url
                        : null
                    }
                  />
                </Link>
                <Link className={"chat-link"} to={`/messenger/`}>
                  <Icon type={"wechat"} /> My Chats
                </Link>
                <Popconfirm
                  icon={<Icon type="logout" />}
                  placement="top"
                  title={"Do you really want to logout ?"}
                  onCancel={event => event.preventDefault()}
                  onConfirm={async () => {
                    props.loadingPageAction();
                    await props.clearAdvisors();
                    await props.logout();
                    await props.fetchAdvisors("/users/advisors");
                    props.hideProgressBar();
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className={"logout-btn"} icon={"logout"}>
                    Logout
                  </Button>
                </Popconfirm>
              </div>
            ) : (
              <>
                <div className={"menu-navs"}>
                  <NavLink
                    activeClassName={"active"}
                    to={"/login"}
                    className={"au-link"}
                  >
                    Login{" "}
                  </NavLink>{" "}
                  <NavLink
                    activeClassName={"active"}
                    className={"au-link"}
                    to={"/signup"}
                  >
                    {" "}
                    Sign Up
                  </NavLink>
                </div>
              </>
            )}
          </div>
        )}
      </Motion>
    </header></Affix>
  );
};
const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { logout, loadingPageAction, hideProgressBar, clearAdvisors, fetchAdvisors }
  )(Navbar)
);
