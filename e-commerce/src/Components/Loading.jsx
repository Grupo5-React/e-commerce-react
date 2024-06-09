import React from 'react';

const Loading = ({ width, height }) => {
  return (
    <div
      className="active"
      style={{ width: `${width}`, height: `${height}` }}
    ></div>
  );
};

export default Loading;
