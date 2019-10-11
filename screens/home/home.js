import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Content, ListItem, Left, Text, Right, Radio, Button } from 'native-base';
import { connect } from 'react-redux';
import Loader from '../../components/loader';
import * as effects from './effects';

const lists = [
  {
    id: 1,
    name: 'Словарь 1'
  },
  {
    id: 2,
    name: 'Словарь 2'
  },
  {
    id: 3,
    name: 'Словарь 3'
  },
  {
    id: 4,
    name: 'Словарь 4'
  }
];

const mapDispatchToProps = {
  getMainData: effects.getMainData
};

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home
});

const HomeScreen = ({ getMainData, home, navigation }) => {
  const { routeName } = navigation.state;

  const onStart = () => {
    console.log('start')
    navigation.navigate('DictionaryTraining');
  };

  useEffect(() => {
    getMainData(navigation);
  }, [routeName]);

  if (!home) {
    return <Loader />;
  }

  return (
    <Content>
      <Container>
        <Text style={{ textAlign: 'center' }}>Выберите словарь для старта</Text>
        <Dictionaries>
          {lists.map(item => (
            <ListItem key={item.id}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
            </ListItem>
          ))}
        </Dictionaries>
        <Start>
          <Button info onPress={onStart}>
            <Text>Начать</Text>
          </Button>
        </Start>
      </Container>
    </Content>
  );
};

HomeScreen.navigationOptions = {
  title: 'Тренировки'
};

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const Dictionaries = styled.View`
  margin-top: 10px;
`;

const Start = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
