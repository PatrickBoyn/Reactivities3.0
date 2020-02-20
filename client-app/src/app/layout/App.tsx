import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/nav-bar/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { SyntheticEvent } from 'react';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [target, setTarget] = useState('');

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading activities...' />;

  return (
    <Fragment>
      <Navbar />
      {/* I don't normally use inline styles. */}
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
