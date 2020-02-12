import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/nav-bar/NavBar';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('/api/activities').then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <List>
        {activities.map(activity => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
