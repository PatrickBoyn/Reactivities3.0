import React, { Component } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get('/api/values').then(response => {
      this.setState({
        values: response.data
      });
    });
  }
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
