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

interface IProps {
  activities: IActivity[];
}

const ActivityList: React.FC<IProps> = ({ activities }) => {
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
                  <Button floated='right' content='View' color='blue' />
                  <Label basic content='Category' />
                </Item.Extra>
              </ItemContent>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default ActivityList;
