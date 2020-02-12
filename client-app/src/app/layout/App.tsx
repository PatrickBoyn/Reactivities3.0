import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { List, Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/nav-bar/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('/api/activities').then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <Fragment>
      <Navbar />
      {/* I don't normally use inline styles. */}
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
