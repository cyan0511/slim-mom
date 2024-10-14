import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonWrapper } from 'components/Form/Form.styled';
import { ThemeContext } from 'components/Context/Context';

const NotFound = () => {
  const { isNightMode } = useContext(ThemeContext);

  return (
    <>
      {isNightMode}
      <section style={{ padding: '0px 0 0px', background: '#fff' }}>
        <div
          style={{
            backgroundImage:
              'url(https://cdn.dribbble.com/userupload/8726278/file/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif)',
            height: '700px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
          }}
        ></div>

        <div style={{ marginTop: '-50px' }}>
          <h3 style={{ fontSize: '34px', textAlign: 'center' }}>
            Look like you're lost
          </h3>

          <p style={{ textAlign: 'center' }}>
            the page you are looking for not avaible!
          </p>
          <ButtonWrapper
            style={{
              justifyContent: 'center',
              position: 'static',
              display: 'flex',
            }}
          >
            <LinkStyled to={'/'}>Go to Home</LinkStyled>
          </ButtonWrapper>
        </div>
      </section>
    </>
  );
};
export default NotFound;

const LinkStyled = styled(Link)`
  padding: 13px 25px;
  border-radius: 30px;
  margin-top: 20px;
  border: ${p => p.theme.borders.none};
  font-family: ${p => p.theme.fonts.body};
  line-height: ${p => p.theme.lineHeights.body};
  font-size: ${p => p.theme.fontSizes[0]};
  letter-spacing: 0.04em;
  text-decoration: none;

  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.orange};
  box-shadow: 0px 4px 10px rgba(252, 132, 45, 0.5);
  &:hover,
  &:focus {
    background: ${p => p.theme.colors.hover};
  }
`;
