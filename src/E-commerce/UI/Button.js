import React from 'react'

import './Button.scss'

function Button(props) {
  return (
    <button onClick={props.onClick} className="UI-button" data-id={props.id}>
      {props.children}
    </button>
  );
}

export default Button