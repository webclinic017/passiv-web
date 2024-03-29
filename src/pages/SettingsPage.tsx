import React from 'react';
import styled from '@emotion/styled';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';
import NotificationsManager from '../components/NotificationsManager';
import AccountsManager from '../components/AccountsManager';
import DemoNotes from '../components/DemoNotes';
import { selectIsDemo } from '../selectors';
import { useSelector } from 'react-redux';

export const Container2Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      width: 50%;
      margin-right: 30px;
    }
    > div:last-of-type {
      width: 50%;
    }
  }
`;

const SettingsPage = () => {
  const isDemo = useSelector(selectIsDemo);
  return (
    <React.Fragment>
      <Container2Column>
        <div>
          <CredentialsManager />
          <NotificationsManager />
        </div>
        {isDemo ? <DemoNotes /> : <SubscriptionManager />}
      </Container2Column>
      <ConnectionsManager />
      <AccountsManager />
    </React.Fragment>
  );
};

export default SettingsPage;
