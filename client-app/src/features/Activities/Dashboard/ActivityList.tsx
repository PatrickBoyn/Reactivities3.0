import React from 'react';
import {
  ItemGroup,
  Item,
  ItemContent,
  Button,
  Label,
  Segment
} from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <ItemGroup divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <ItemContent>
              <ItemContent>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectActivity(activity.id)}
                    floated='right'
                    content='View'
                    color='blue'
                  />
                  <Button
                    name={activity.id}
                    loading={target === activity.id && submitting}
                    onClick={e => deleteActivity(e, activity.id)}
                    floated='right'
                    content='Delete'
                    color='red'
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </ItemContent>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default observer(ActivityList);
