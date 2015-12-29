import React from 'react';
import Showcase from './components/Showcase.jsx';
import IndexPage from './components/IndexPage.jsx';
import ReactDom from 'react-dom';

require('./css/bootstrap.css');

ReactDom.render(<IndexPage />, document.getElementById('content'));
