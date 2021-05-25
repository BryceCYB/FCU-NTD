import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const COLORS = {
  primaryDark: "#000000",
  primaryLight: "#80cdff"
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: absolute;
  top: 2.5rem;
  right: 3.5rem;
  border-radius: 50%;
  height: 4.6rem;
  width: 4.6rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;

  @media screen and (max-width: 768px) {
    top: 1.5rem;
    right: 1rem;
    height: 3.6rem;
    width: 3.6rem;
  }
`;

const NavBackground = styled.div`
  position: fixed;
  top: 2.5rem;
  right: 3.5rem;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 6;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;

  @media screen and (max-width: 768px) {
    top: 1.5rem;
    right: 1rem;
  }
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 2rem;
  height: 2px;
  display: inline-block;
  margin-top: 2.3rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
  @media screen and (max-width: 768px) {
    margin-top: 1.8rem;
    width: 1.6rem;
    &::before,
    &::after {
      width: 1.6rem;
    }
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 6;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 22%;
  left: 6%;
  text-align: left;
  width: 100%;
`;

const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 3rem;
  font-weight: 400;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1.2rem 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }

  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

function HamburgerMenu({isTeacher}) {
  const [click, setClick] = useState(false);
  const [teacherList, setTeacherList] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    setTeacherList(isTeacher);
  }, [isTeacher]);

  const renderStudentList = () => {
    return (
      <>
        <li>
          <ItemLink onClick={handleClick} to="/fcu/allcourses">
            Courses
          </ItemLink>
        </li>
        <li>
          <ItemLink onClick={handleClick} to="/fcu/yourcourses">
            Schedule
          </ItemLink>
        </li>
      </>
    )
  }

  const renderTeacherList = () => {
    return (
      <>
        <li>
          <ItemLink onClick={handleClick} to="/fcu/newcourse">
            Create new course
          </ItemLink>
        </li>
        <li>
          <ItemLink onClick={handleClick} to="/fcu/make-announcement">
            Make Announcement
          </ItemLink>
        </li>
      </>
    )
  }

  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>
      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/fcu/">
              About
            </ItemLink>
          </li>
          {teacherList ? renderTeacherList() : renderStudentList()} 
          <li>
            <ItemLink onClick={handleClick} to="/fcu/term">
              Terms of Service
            </ItemLink>
          </li>
        </List>
      </Navigation>
    </>
  );
}

export default HamburgerMenu;