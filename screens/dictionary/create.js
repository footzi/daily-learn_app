import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text, Content, Button, Input, Item, H3, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ButtonLoader from '../../components/buttons';
import { ButtonAdd } from '../../components/buttons/buttonAdd';
import { Ionicons } from '@expo/vector-icons';

const CreateDictionaryScreen = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [counter, setCounter] = useState([]);

  const onChangeName = text => {
    setName(text);
  };

  const onAdd = () => {
    if (!title) {
      setTitle(name);
    }

    setCounter([...counter, '1']);

    console.log([...counter, '1'])

  };

  return (
    <Container>
      {title ? (
        <Title>
          <H3>{title}</H3>
        </Title>
      ) : (
        <Name>
          <Item inlineLabel>
            <Input placeholder="Название" onChangeText={onChangeName} value={name} />
          </Item>
        </Name>
      )}

      {counter.map((item, index) => (
        <Test key={index}>
          <Item inlineLabel>
            <Input placeholder="English" />
          </Item>
          <Item inlineLabel>
            <Input placeholder="Русский" />
          </Item>
        </Test>
      ))}

      <Add>
        <Button iconLeft bordered success disabled={!name} onPress={onAdd}>
          <Icon name="add" />
          <Text>Добавить слово</Text>
        </Button>
      </Add>
      <Save>
        <ButtonLoader info name="Cохранить" width="auto" disabled={true} />
      </Save>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const Title = styled.View`
  align-items: center;
`;

const Name = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const Test = styled.View``;

const Add = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Save = styled.View`
  margin-top: 30px;
`;

CreateDictionaryScreen.navigationOptions = {
  title: 'Новый словарь'
};

export default CreateDictionaryScreen;
