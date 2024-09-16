'use client'
import React from "react";
import SearchBar from "./SearchBar";
import FollowUs from "./FollowUs";
import Footer from "./Footer";
import { FaChevronRight } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

// Estilo para la lista de categorías
const CategoryList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  color: #60a5fa; /* text-blue-400 */
  padding: 0;

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ef4444; /* text-red-600 */
    }

    .icon {
      margin-right: 0.5rem;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    &:hover .icon {
      color: #ef4444; /* Cambia el color del ícono al rojo */
      transform: translateX(5px); /* Mueve el ícono a la derecha */
    }
  }
`;

// Estilo para las transiciones de entrada y salida
const FadeTransition = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const categories = [
  "Telephony",
  "Automobiles",
  "Televisions",
  "Restaurants",
  "Home Appliances",
  "Internet and Services",
  "Travel and Airlines",
  "Banks and Finance",
  "Clothing and Footwear",
  "Technology and Gadgets"
];

const RightSection = ({ onCategorySelect, onSearch }) => {
  return (
    <div>
      <div>
        <TransitionGroup component={CategoryList}>
          {categories.map((category, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <FadeTransition>
                <li onClick={() => onCategorySelect(category)}>
                  <FaChevronRight className="icon" />
                  <span>{category}</span>
                </li>
              </FadeTransition>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="my-10" >
        <SearchBar onSearch={onSearch} />
      </div>
      <div>
        <FollowUs />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default RightSection;
