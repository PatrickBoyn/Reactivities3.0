import React, { useEffect, useContext, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from '../../features/nav-bar/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/Activities/Form/ActivityForm';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading activities...' />;

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomePage} />
        <Route path='/activities' component={ActivityDashboard} />
        <Route path='/createActivity' component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App);
