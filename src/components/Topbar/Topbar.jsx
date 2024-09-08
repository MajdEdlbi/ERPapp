import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Avatar } from '@mui/material';
import Slide from '@mui/material/Slide';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

export default function Topbar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: '#f5f5f5'}}>
          <Toolbar>
            <Avatar sx={{ bgcolor: '#5c6bc0' }}>M</Avatar>
          </Toolbar>
          
        </AppBar>
      </HideOnScroll>
      <Toolbar />
     
    </React.Fragment>
  );
}
