import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DetailsHeader from './DetailsHeader';
import DetailsInfo from './DetailsInfo';
import DetailsChat from './DetailsChat';
import DetailSidebar from './DetailSidebar';
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial || !activity)
    return <LoadingComponent content='Loading Activity...' />;

  if (!activity) {
    return <h2>Activity not found</h2>;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <DetailsHeader activity={activity} />
        <DetailsInfo activity={activity} />
        <DetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <DetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
