import React from 'react';
import './SectionGame.css';
import PropTypes from 'prop-types';

export const SectionGame = ({key, name, color}) => {

  const colorSection = {
    backgroundColor: color
  };

  return (
    <section className='sectionGame' style={colorSection}>
      Teste
    </section>
  );
};

SectionGame.propTypes = {
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  collor: PropTypes.string.isRequired
};
