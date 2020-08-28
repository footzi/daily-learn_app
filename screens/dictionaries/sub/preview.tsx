import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text, Button, Icon, H3, Content } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NewColors as Colors } from '@constants';
import { useModal, HeaderModal, Checkbox, ButtonIcon } from '@components';
import { shuffleArray } from '@libs';
import { AddWord, RemoveWord } from '../organism';
import { normalizePreviewWords } from '../normalize';
import * as effects from '../effects';
import * as Animatable from 'react-native-animatable';

const zoomOut = {
  0: {
    opacity: 0,
    translateY: -70,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

// const zoomIn = {
//   0: {
//     opacity: 1,
//     translateY: 280,
//   },
//   0.9: {
//     opacity: 1,
//   },
//   1: {
//     opacity: 0,
//     translateY: 0,
//   },
// };

export const PreviewDictionaryScreen = ({ navigation = {}, route = {} }) => {
  const { dictionaries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { preview_dictionary = {} } = route.params;

  const [words, setWords] = useState([]);
  const [isEn, setIsEn] = useState(true);
  const [isRu, setIsRu] = useState(true);
  const [isMix, setIsMix] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deletedWord, setDeletedWord] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isHeaderOpenModal, headerOpenModal, headerCloseModal] = useModal();
  const [isDeleteWordOpenModal, deleteWordOpenModal, deleteWordCloseModal] = useModal();

  const onOnlyRu = () => setIsRu(!isRu);
  const onOnlyEn = () => setIsEn(!isEn);
  const onMix = () => setIsMix(!isMix);
  const onDelete = () => setIsDelete(!isDelete);

  const onSaveWord = async (fields) => {
    await dispatch(effects.saveWord({ fields, preview_dictionary }));
    closeModal();
  };

  const onDeleteWord = (item) => {
    setDeletedWord(item);
    deleteWordOpenModal();
  };

  const onSubmitDeleteWord = async () => {
    const ids = deletedWord.translates.map((item) => item.id);

    await dispatch(effects.removeWord(ids));
    setDeletedWord('');
    deleteWordCloseModal();
  };

  const menuRef = useRef(null);
  const [isOpenTest, setIsOpenTest] = useState(false);
  const onOpenTest = () => {
    menuRef.current.animate(zoomOut, 300);
  };

  useEffect(() => {
    const currentDictionary = dictionaries.find((item) => item.id === preview_dictionary.id);

    if (currentDictionary) {
      const dictionaryWords = currentDictionary.words;
      const currentWords = normalizePreviewWords(dictionaryWords);

      setWords(currentWords);
    }
  }, [dictionaries]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: preview_dictionary.name,
      headerRight: () => (
        <TopNavigation>
          <Buttons>
            <ButtonIcon style={{ marginRight: 30 }}>
              <Feather name="plus-circle" size={26} color={Colors.primary} />
            </ButtonIcon>
            <ButtonIcon onPress={onOpenTest}>
              <FontAwesome name="pencil" size={24} color={Colors.primary} />
            </ButtonIcon>


          </Buttons>

          <Animatable.View ref={menuRef} easing="ease-in-out" useNativeDriver style={{opacity: 0}}>
            <Menu>
              <ButtonIcon style={{ marginBottom: 30 }}>
                <FontAwesome name="trash" size={22} color={Colors.green} />
              </ButtonIcon>
              <ButtonIcon style={{ marginBottom: 30 }}>
                <Feather name="eye-off" size={20} color={Colors.green} />
              </ButtonIcon>
              <ButtonIcon>
                <Feather name="shuffle" size={20} color={Colors.green} />
              </ButtonIcon>
            </Menu>
          </Animatable.View>



        </TopNavigation>

        // <Button transparent onPress={headerOpenModal}>
        //   {isHeaderOpenModal ? (
        //     <Icon name="md-close" style={{ color: Colors.black }} />
        //   ) : (
        //     <Icon name="md-menu" style={{ color: Colors.black }} />
        //   )}
        // </Button>
      ),
    });
  }, [navigation, isHeaderOpenModal]);

  useLayoutEffect(() => {
    const sortedWords = isMix ? shuffleArray([...words]) : [...words].sort((a, b) => a.id - b.id);

    setWords(sortedWords);
  }, [isMix]);

  useLayoutEffect(() => {
    if (isDelete) headerCloseModal();
  }, [isDelete]);

  return (
    //<KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={100}>
    <>
      <Content>
        <Container>
          {!words.length && <H3 style={{ textAlign: 'center' }}>У вас еще нет слов(</H3>}

          {words.map((item) => (
            <Line key={item.groupId}>
              <Item isShow={isRu}>
                <Text>{item.name}</Text>
              </Item>
              <Item isShow={isEn}>
                {item.translates.map(({ id, translate }) => (
                  <Text key={id}>{translate}</Text>
                ))}
              </Item>

              {isDelete && (
                <Remove>
                  <Button transparent onPress={() => onDeleteWord(item)}>
                    <Icon name="trash" />
                  </Button>
                </Remove>
              )}
            </Line>
          ))}

          <Add>
            <Button bordered success onPress={openModal}>
              <Icon name="add" />
            </Button>
          </Add>

          <AddWord isOpenModal={isOpenModal} closeModal={closeModal} onSaveWord={onSaveWord} />
          <RemoveWord
            word={deletedWord}
            isOpenModal={isDeleteWordOpenModal}
            closeModal={deleteWordCloseModal}
            onDeleteWord={onSubmitDeleteWord}
          />
          <HeaderModal isOpenModal={isHeaderOpenModal} closeModal={headerCloseModal}>
            <CheckLine style={{ marginBottom: 10 }}>
              <Checkbox checked={!isRu} text="только русский" onPress={onOnlyRu} />
            </CheckLine>
            <CheckLine style={{ marginBottom: 10 }}>
              <Checkbox checked={!isEn} text="только английский" onPress={onOnlyEn} />
            </CheckLine>
            <CheckLine style={{ marginBottom: 10 }}>
              <Checkbox checked={isMix} text="перемешать слова" onPress={onMix} />
            </CheckLine>
            <CheckLine>
              <Checkbox checked={isDelete} text="удалить слова" onPress={onDelete} />
            </CheckLine>
          </HeaderModal>
        </Container>
      </Content>
    </>
    //</KeyboardAvoidingView>
  );
};

const Te = styled.View`
  position: relative;
`;
//right: 30px;
//transform: translateY(-100px);
const Menu = styled.View`
  position: absolute;
  padding-top: 10px;
  padding-bottom: 10px;
  
  right: 0;
  top: 17px;
  bottom: 0;
  width: 30px;
  height: 150px;
  align-items: center;
  background-color: ${Colors.secondary};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 1;
  
     

`;

// opacity: 0;
// transform: translateY(-150px);


const TopNavigation = styled.View`
  margin-right: 30px;
 position: relative;
`;

//   padding-right: 30px;
//   align-items: center;
//   flex-direction: row;
//   z-index: 2;
//   position: relative;
const Buttons = styled.View`
flex-direction: row;
 align-items: center;
   z-index: 2;
  position: relative;
  background-color: ${Colors.secondary};
`;

const CheckLine = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Line = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black};
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
`;

const Item = styled.View`
  flex: 1;
  flex-direction: column;
  opacity: ${(p) => (p.isShow ? 1 : 0)};
  padding-bottom: 10px;
  padding-top: 10px;
`;

const Remove = styled.View`
  position: absolute;
  top: 0;
  right: -10px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  padding: 10px;
  flex-direction: column;
`;

const Add = styled.View`
  margin-top: 20px;
  align-items: center;
`;
