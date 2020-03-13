import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Content, ListItem, Text, Button, H3, CheckBox } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '@components';
import * as effects from './effects';
import * as commonEffects from '@store/common-effects';

const HomeScreen = ({ navigation }) => {
  const { homeScreen, data, isProcessing } = useSelector(state => state);
  const { dictionaries } = homeScreen;
  const dispatch = useDispatch();

  const onStart = () => dispatch(effects.startTraining(navigation));
  const onSelect = id => dispatch(effects.selectDictionary(id));

  const haveSelected = dictionaries.some(item => item.checked);

  useEffect(() => {
    dispatch(commonEffects.getMainData());
  }, []);

  useEffect(() => {
    if (data && data.dictionaries) {
      dispatch(effects.setDictionaries());
    }
  }, [data]);

  if (!data) {
    return <Loader />
  }

  return (
    <Content>
      {isProcessing && <Loader opacity={0.4} />}
      <Container>
        {dictionaries.length > 0 ? (
          <Text style={{ textAlign: 'center' }}>Выберите словарь для старта</Text>
        ) : (
          <H3 style={{ textAlign: 'center' }}>Для начала создайте словарь</H3>
        )}

        <Dictionaries>
          {dictionaries.map(item => (
            <ListItem key={item.id}>
              <CheckBox onPress={() => onSelect(item.id)} checked={item.checked} />
              <Item onPress={() => onSelect(item.id)}>
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
