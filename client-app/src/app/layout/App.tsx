import React, { useEffect, useContext, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from '../../features/nav-bar/NavBar';
import ActivityDashboard from '../../features/Activities/Dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/Activities/Form/ActivityForm';
import ActivityDetails from '../../features/Activities/Details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {
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
        <Route exact path='/activities' component={ActivityDashboard} />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route
          key={location.key}
          path={['/createActivity', '/manage/:id']}
          component={ActivityForm}
        />
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
