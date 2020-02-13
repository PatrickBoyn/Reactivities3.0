import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/nav-bar/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

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
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
