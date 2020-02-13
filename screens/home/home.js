import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Content, ListItem, Text, Button, H3, CheckBox } from 'native-base';
import { useSelector } from 'react-redux';
import { normalizeDictionaries } from './normalize';

const HomeScreen = ({ navigation }) => {
  const data = useSelector(state => state.data);
  const [dictionaries, selectDictionary] = useState(normalizeDictionaries(data.dictionaries));

  const onStart = () => {
    const selectedDictionaries = dictionaries.filter(item => item.checked).map(dict => dict.id);

    console.log(selectedDictionaries);

    navigation.navigate('DictionaryTraining', { selectedDictionaries });
  };

  const onSelect = dict => {
    const checkedDictionaries = dictionaries.map(item => {
      if (dict.id === item.id) {
        item.checked = !item.checked;
      }

      return item;
    });

    selectDictionary(checkedDictionaries);
  };

  const haveSelected = dictionaries.some(item => item.checked);

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
              <CheckBox onPress={() => onSelect(item)} checked={item.checked} />
              <Item onPress={() => onSelect(item)}>
                <Name>{item.name}</Name>
              </Item>
            </ListItem>
          ))}
        </Dictionaries>

        {dictionaries.length > 0 && (
          <Start>
            <Button info={haveSelected} disabled={!haveSelected} onPress={onStart}>
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
  margin-top: 20px;
`;

const Start = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Item = styled.TouchableOpacity`
  padding-left: 15px;
  flex: 1;
`;

const Name = styled.Text`
  align-self: flex-start;
`;

export default HomeScreen;
