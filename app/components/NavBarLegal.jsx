import React, { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';  
import { FaArrowLeft } from 'react-icons/fa';  
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

  

  return (
    <>
      <nav className='content-center'>
        <LoginRegisterButton />
      </nav>

      <nav className="flex items-center justify-between p-4" style={{backgroundImage:'linear-gradient(180deg, rgba(13, 71, 161, 1) 0%, rgba(13, 71, 161, 0.7) 50%, rgba(0, 0, 0, 1) 100%);'}}>
        <div>
        <Link href="/">
        <img  src='/logo.png' alt="Logo" style={{ width:'13rem', cursor: 'pointer' }}/>
        </Link>
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
                  '--button-primary-color': '#ffeb3b',
                  '--button-primary-color-dark': '#dcc604',
                  '--button-primary-color-light':'#000000',
                  '--button-primary-color-hover':'#eed70e',
                  '--button-primary-border':' ',
                  '--button-primary-color-active': '#fbe62e',
                }}
                before={<FaArrowLeft />}
                onPress={() => window.location.href = "/"}
              >
                Return
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
