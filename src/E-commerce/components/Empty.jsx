import React from 'react'

import './Empty.scss'

function Empty({text}) {
  return (
    <div className="empty">
      <p>{text}</p>
    </div>
  );
}

export default Empty