import React, { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';  
import { FaBolt, FaClock, FaRandom, FaPen } from 'react-icons/fa';  
import LoginRegisterButton from './LoginRegisterButton';
import Link from 'next/link';
import PostVIANModal from './PostVIANModal ';
import PropTypes from 'prop-types';


const Navbar = ({ onSortByDate, onSortByComments, onSortByRandom }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Esto forzará una recarga completa de la página
  };

  return (
    <>
      <nav className='content-center'>
        <LoginRegisterButton />
      </nav>

      {/* <nav className="flex items-center justify-between p-4" style={{backgroundImage:'linear-gradient(180deg, rgba(13, 71, 161, 1) 0%, rgba(13, 71, 161, 0.7) 50%, rgba(0, 0, 0, 1) 100%);'}}> */}
      <nav className="flex items-center justify-between p-8" style={{backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(13, 71, 161, 1) 50%, rgba(0, 0, 0, 1) 100%)'}}>
      <div>
      <a href="/" onClick={handleLogoClick}>
        <img src="/logo.png" alt="Logo" style={{ width: '13rem', cursor: 'pointer' }} />
      </a>
    </div>
        
        <div className="flex flex-col content-between items-end mx-4 h-ful w-3/4 gap-5">
          <div className='flex'>
            <h3 className='text-right text-base'>
              VentItAllNow! is your space to voice your negative experiences with products or services.
              Don’t hold back, express it now! Share your complaint quickly and help others stay informed. 
              <br/>
              It's simple and straightforward. <span className='text-orange-500 font-bold'>Say it loud, say it now on VentItAllNow!!</span>
            </h3>
          </div>
          <ul className="flex justify-center space-x-8 mt-4">
            <li>
              <AwesomeButton type="primary" 
                style={{
                  '--button-primary-color': '#2196f3',
                  '--button-primary-color-dark': '#0c15eb',
                  '--button-primary-color-light':'#FFFFFF',
                  '--button-primary-color-hover':'#004dcf',
                  '--button-primary-border':' ',
                  '--button-primary-color-active': '#03a9f4',
                }}
                before={<FaClock />}
                onPress={onSortByDate}
              >
                Latest Posts
              </AwesomeButton>
            </li>
            <li>
              <AwesomeButton 
                style={{
                  '--button-primary-color': '#d92929',
                  '--button-primary-color-dark': '#920808',
                  '--button-primary-color-light':'#FFFFFF',
                  '--button-primary-color-hover':'#920808',
                  '--button-primary-border':' ',
                  '--button-primary-color-active': '#d73232',
                }}
                type="primary" 
                before={<FaBolt />}
                onPress={onSortByComments}
              >
                Top
              </AwesomeButton>
            </li>
            <li>
              <AwesomeButton 
                style={{
                  '--button-primary-color': '#A029E0',
                  '--button-primary-color-dark': '#56046C',
                  '--button-primary-color-light':'#FFFFFF',
                  '--button-primary-color-hover':'#751FA3',
                  '--button-primary-border':' ',
                  '--button-primary-color-active': '#E100FF',
                }}
                type="primary" 
                before={<FaRandom />}
                onPress={onSortByRandom}
              >
                Random
              </AwesomeButton>
            </li>
            <li>
              <AwesomeButton 
                style={{
                  '--button-primary-color': '#06ce09',
                  '--button-primary-color-dark': '#0F875B',
                  '--button-primary-color-light':'#FFFFFF',
                  '--button-primary-color-hover':'#008b02',
                  '--button-primary-border':' ',
                  '--button-primary-color-active': '#06ce09',
                }}
                type="primary" 
                before={<FaPen />}
                onPress={handleOpenModal}  // Muestra el modal al hacer clic
              >
                Post Your VIAN
              </AwesomeButton>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal para Post Your VIAN */}
      <PostVIANModal showModal={showModal} onClose={handleCloseModal} />
    </>
  );
};
Navbar.propTypes = {
  onSortByDate: PropTypes.func.isRequired,
  onSortByComments: PropTypes.func.isRequired,
  onSortByRandom: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Navbar;
