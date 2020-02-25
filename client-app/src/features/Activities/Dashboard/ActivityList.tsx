import React, { Fragment } from 'react';
import { ItemGroup, Segment, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  const { activitiesByDate } = activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
            {group}
          </Label>

          <ItemGroup divided>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </ItemGroup>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
