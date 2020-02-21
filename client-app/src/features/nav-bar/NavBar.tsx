import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { StyledImg } from './navbarStyles';
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to='/'>
          <StyledImg src='/assets/logo.png' alt='logo' />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createActivity'
            positive
            content='Create Activity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
