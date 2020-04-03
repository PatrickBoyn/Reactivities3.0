import React, { Fragment } from 'react';
import { ItemGroup, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import ActivityListItem from './ActivityListItem';
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { activitiesByDate } = rootStore.activityStore;
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
