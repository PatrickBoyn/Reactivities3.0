import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DetailsHeader from './DetailsHeader';
import DetailsInfo from './DetailsInfo';
import DetailsChat from './DetailsChat';
import DetailSidebar from './DetailSidebar';

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content='Loading Activity...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <DetailsHeader activity={activity} />
        <DetailsInfo />
        <DetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <DetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
