import React from 'react';
import './MessageBar.css';

export const MessageBar = (props) => (
  <p className="app-message">{props.message}</p>
);
