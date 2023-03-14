import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableNativeFeedback, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SCREENS, NewColors as Colors, LOADING_ITEMS } from '@constants';
import { useModal, ButtonIcon } from '@/components';
import * as effects from './effects';
import { CreateDictModal } from './components';
import PlusIcon from '@/assets/icons/plus.svg';
import { getDictionaryColor } from './utils/getDictionaryColor';

export const DictionariesScreen = ({ navigation = {} }) => {
  const { dictionaries = [], loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal();
  const isLoading = loading[LOADING_ITEMS.INNER];

  const onCreate = (body) => dispatch(effects.createDictionary({ navigation, body, closeModal }));
  const onPreview = (preview_dictionary) => {
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <ButtonIcon onPress={openModal}>
            <PlusIcon color={Colors.primary} />
          </ButtonIcon>
        </HeaderRight>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      {!dictionaries.length && (
        <ImageContainer>
          <Image style={{ width: 195, height: 270 }} source={require('@/assets/images/not-dictionaries.png')} />
        </ImageContainer>
      )}

      {dictionaries.length > 0 && (
        <ScrollView>
          <List>
            {dictionaries.map((item, index) => {
              const { background, feedback } = getDictionaryColor(index);

              return (
                <TouchableNativeFeedback
                  key={item.id}
                  background={TouchableNativeFeedback.Ripple(feedback)}
                  onPress={() => onPreview(item)}>
                  <Item style={{ backgroundColor: background }}>
                    <Name>{item.name}</Name>
                  </Item>
                </TouchableNativeFeedback>
              );
            })}
          </List>
        </ScrollView>
      )}

      <CreateDictModal isOpenModal={isOpenModal} closeModal={closeModal} onCreate={onCreate} isLoading={isLoading} />
    </Container>
  );
};

const HeaderRight = styled.View`
  margin-right: 20px;
`;

const Container = styled.View``;

const ImageContainer = styled.View`
  align-items: center;
  margin-top: 96px;
`;

const List = styled.View`
  align-items: center;
  padding: 30px;
`;

const Item = styled.View`
  width: 100%;
  max-width: 315px;
  height: 48px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  elevation: 4;
`;

const Name = styled.Text`
  font-family: RobotoRegular;
  font-size: 16px;
  color: ${Colors.white};
`;
