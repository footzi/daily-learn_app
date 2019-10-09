import React from 'react';
import styled from 'styled-components';
import { Text, Content, Button, Input, Item } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ButtonLoader from '../../components/buttons';

const DictionaryScreen = ({ navigation }) => {
  const create = () => {
    navigation.navigate('CreateDictionary');
  }

  return (
    <Content>
      <Container>
        <Create>
          <Button info onPress={create}>
            <Text>Создать словарь</Text>
          </Button>
        </Create>
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const Create = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const NewDict = styled.View``;

const Top = styled.View`
  /* flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center; */
  margin-top: 10px;
`;

DictionaryScreen.navigationOptions = {
  title: 'Словари'
};

export default DictionaryScreen;
