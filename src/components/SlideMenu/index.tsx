import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import MenuButton from './MenuButton';
import Menu from './Menu';
import { selectIsMobile } from '../../selectors/browser';
import { selectPathname } from '../../selectors/router';
import { selectShowOnboardingApp } from '../../selectors';

const StyledSlideMenu = styled.div`
  position: relative;
  top: 0;
  left: 0;
  z-index: 5;
  min-height: 100vh;
`;

export const SlideMenu = () => {
  const isMobile = useSelector(selectIsMobile);
  const pathname = useSelector(selectPathname);
  const showOnboarding = useSelector(selectShowOnboardingApp);
  const [visible, setVisible] = useState(!isMobile && !showOnboarding);
  const [oldPath, setPath] = useState(pathname);

  // check our path to see if it's changed
  // if it has and we're on mobile, close the menu
  if (isMobile && oldPath !== pathname) {
    setPath(pathname);
    setVisible(false);
  }

  if (oldPath !== pathname && pathname === '/app/demo') {
    setPath(pathname);
    setVisible(false);
  }

  return (
    <StyledSlideMenu>
      <MenuButton
        menuVisibility={visible}
        handleMouseDown={() => setVisible(!visible)}
      />
      <Menu menuVisibility={visible} />
    </StyledSlideMenu>
  );
};

export default SlideMenu;
