import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../../styles/ProfilePage.less';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();

  const rawDate = user.updated_at;
  const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return (
    isAuthenticated && (
      <div className="section-container">
        <div className="content-container">
          {user?.picture && <img src={user.picture} alt={user?.name} />}
          <h2>{user?.name}</h2>
          <div className="user-info-container">
            <div className="user-info">
              <span className="obj-key">Username: </span>
              <span className="user-value">{user.nickname}</span>
            </div>
            <div className="user-info">
              <span className="obj-key">Last Updated: </span>
              <span className="user-value">{formattedDate}</span>
            </div>
          </div>{' '}
        </div>
      </div>
    )
  );
};

export default ProfilePage;