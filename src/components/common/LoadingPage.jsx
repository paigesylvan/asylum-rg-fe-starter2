import React from 'react';
import '../../styles/LoadingPage.less';

export default function LoadingPage() {
  return (
    <div className="container">
      <div className="loading-container">
        <h1>Loading...</h1>
        <div className="loader"></div>
      </div>
    </div>
  );
}
