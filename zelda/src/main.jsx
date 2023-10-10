import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import App from './App';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById('root')
);
