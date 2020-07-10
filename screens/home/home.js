import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { Content, ListItem, Text, Button, CheckBox, Icon } from 'native-base';
import { useSelector } from 'react-redux';
import { Title } from '@components';
import { SCREENS } from '@constants';
import { normalizeDictionaries } from './normalize';
import { SignInScreen } from '../signin';
import { NewColors as Colors } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { TouchableNativeFeedback, View } from 'react-native';
import { themes } from '../../components/Button/themes';

export const HomeScreen = ({ navigation = {} }) => {
  const { dictionaries = [] } = useSelector((state) => state);
  const [dictionariesList, setDictionariesList] = useState([]);

  const onStart = () => {
    const selectedDictionaries = dictionariesList.filter((item) => item.checked).map((dict) => dict.id);

    navigation.navigate(SCREENS.DICTIONARY_TRAINING, { selectedDictionaries });
  };

  const onSelect = (id) => {
    const selected = dictionariesList.map((item) => {
      if (id === item.id) {
        item.checked = !item.checked;
      }

      return item;
    });

    setDictionariesList(selected);
  };

  const onClearSelect = () => {
    if (dictionariesList.length) {
      const unSelected = dictionariesList.map((item) => {
        item.checked = false;
        return item;
      });

      setDictionariesList(unSelected);
    }
  };

  const haveSelected = dictionariesList.some((item) => item.checked);

  useEffect(() => {
    if (!dictionaries.length) {
      navigation.navigate(SCREENS.DICTIONARIES);

      return;
    }

    const normalized = normalizeDictionaries(dictionaries);
    setDictionariesList(normalized);
  }, [dictionaries]);

  useFocusEffect(
    useCallback(() => {
      return () => onClearSelect();
    }, [])
  );

  return (
    <Container>
      <Dictionaries>
        <Item>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.primary)} style={{borderRadius: 20}}>
              <Inner>
                <Name>Животные</Name>
                <AntDesign name="plus" size={40} color={Colors.primary} />
              </Inner>


          </TouchableNativeFeedback>
        </Item>

      </Dictionaries>
    </Container>
    // <Content>
    //   <Container>
    //     {!dictionaries.length && (
    //       <Title style={{ color: 'black' }}>Чтобы начать тренировку, создайте свой первый словарь</Title>
    //     )}
    //
    //     <Dictionaries>
    //       {dictionariesList.map((item) => (
    //         <ListItem key={item.id}>
    //           <CheckBox onPress={() => onSelect(item.id)} checked={item.checked} />
    //           <Item onPress={() => onSelect(item.id)}>
    //             <Name>{item.name}</Name>
    //           </Item>
    //         </ListItem>
    //       ))}
    //     </Dictionaries>
    //
    //     {dictionariesList.length > 0 && (
    //       <Start>
    //         <Button info={haveSelected} disabled={!haveSelected} onPress={onStart}>
    //           <Text>Начать</Text>
    //         </Button>
    //       </Start>
    //     )}
    //   </Container>
    // </Content>
  );
};

const Container = styled.View`
  
`;

const Dictionaries = styled.View`
  margin-top: 20px;
  flex: 1;
  align-items: center;
`;

const Item = styled.View`
  width: 320px;
  height: 60px;
  border: 1px solid ${Colors.primary};
  background-color: ${Colors.secondary};
  border-radius: 15px;
  overflow: hidden;
 
`;

const Inner = styled.View`
 display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
`;

const Name = styled.Text`
  font-family: Museo;
  font-size: 20px;
   color: ${Colors.primary};
`;
// const Container = styled.View`
//   padding: 10px;
//   flex-direction: column;
// `;
//
// const Dictionaries = styled.View`
//   margin-top: 20px;
// `;
//
// const Start = styled.View`
//   margin-top: 20px;
//   align-items: center;
// `;
//
// const Item = styled.TouchableOpacity`
//   padding-left: 15px;
//   flex: 1;
// `;
//
// const Name = styled.Text`
//   align-self: flex-start;
// `;
