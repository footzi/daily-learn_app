import React, { useState } from 'react';
import styled from 'styled-components';
import { Content, ListItem, Left, Text, Right, Radio, Button, H3 } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  data: state.data
});

const HomeScreen = ({ data, navigation }) => {
  const { dictionaries } = data;
  const defaultSelectDictionary = dictionaries.length ? dictionaries[0] : {};

  const [selectDictionary, setSelectDictionary] = useState(defaultSelectDictionary);

  const onStart = () => {
    navigation.navigate('DictionaryTraining', { selectDictionary });
  };

  const onSelect = dictionary => {
    setSelectDictionary(dictionary);
  };

  return (
    <Content>
      <Container>
        {dictionaries.length > 0 ? (
          <Text style={{ textAlign: 'center' }}>Выберите словарь для старта</Text>
        ) : (
          <H3 style={{ textAlign: 'center' }}>Для начала создайте словарь</H3>
        )}

        <Dictionaries>
          {dictionaries.map(item => (
            <ListItem key={item.id}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={item.id === selectDictionary.id} onPress={() => onSelect(item)} />
              </Right>
            </ListItem>
          ))}
        </Dictionaries>

        {dictionaries.length > 0 && (
          <Start>
            <Button info onPress={onStart}>
              <Text>Начать</Text>
            </Button>
          </Start>
        )}
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

export default connect(mapStateToProps)(HomeScreen);
