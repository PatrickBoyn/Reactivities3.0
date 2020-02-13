import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity
}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && (
          <ActivityDetails selectedActivity={selectedActivity} />
        )}
        <ActivityForm />
      </GridColumn>
    </Grid>
  );
};

export default ActivityDashboard;
