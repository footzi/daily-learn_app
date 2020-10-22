import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { CenterModal, Button, Input, ButtonIcon } from '@components';
import { NewColors as Colors, LOADING_ITEMS } from '@constants';

const initial = {
  name: '',
  translate: [{ id: 1, value: '' }],
};

// перенести initial в тело
// убрать подсветку с выделения строк слов
// убрать подсветку у белых кнопко

export const AddWordModal = ({ isOpenModal = true, closeModal = () => {}, onSaveWord = () => {} }) => {
  const { loading } = useSelector((state) => state);
  const isLoading = loading[LOADING_ITEMS.INNER];
  const [isValid, setIsValid] = useState(false);
  const [fields, setFields] = useState(initial);

  const onChangeInput = (text, name, id) => {
    if (name === 'translate') {
      const updates = fields.translate.map((item) => {
        if (item.id === id) {
          item.value = text;
        }

        return item;
      });

      setFields({
        ...fields,
        translate: updates,
      });
    }

    if (name === 'name') {
      setFields({
        ...fields,
        name: text,
      });
    }
  };

  const onAddField = () => {
    console.log('click');
    const id = fields.translate.length + 1;
    setFields({
      ...fields,
      translate: [...fields.translate, { id, value: '' }],
    });
  };

  const onRemoveField = (id) => {
    const updates = fields.translate.filter((item) => item.id !== id);
    setFields({
      ...fields,
      translate: updates,
    });
  };

  const onSave = () => onSaveWord(fields);

  useEffect(() => {
    const isValid = fields.name && fields.translate.every((item) => !!item.value);
    setIsValid(isValid);
  }, [fields]);

  useEffect(() => {
    if (isOpenModal) {
      setFields(initial);
    }
  }, [isOpenModal]);

  return (
    <CenterModal theme="primary" isOpenModal={isOpenModal} closeModal={closeModal} title="Добавьте слово">
      <Field>
        <Input
          theme="secondary"
          placeholder="English"
          value={fields.name}
          onChangeText={(text) => onChangeInput(text, 'name')}
          autoFocus={fields.translate.length <= 1}
        />
        {/* <Input
          placeholder="English"
          onChangeText={(text) => onChangeInput(text, 'name')}
          value={fields.name}
          autoFocus={fields.translate.length <= 1}
        /> */}
      </Field>

      {fields.translate.map((item) => (
        <Field key={item.id}>
          <Input
            theme="secondary"
            placeholder={item.id === 1 ? 'Русский' : 'Добавить перевод'}
            value={item.value}
            onChangeText={(text) => onChangeInput(text, 'translate', item.id)}
            paddingRight={25}
            autoFocus={item.id !== 1}
          />

          {/* <Input
            placeholder={item.id === 1 ? 'Русский' : 'Добавить перевод'}
            onChangeText={(text) => onChangeInput(text, 'translate', item.id)}
            value={item.value}
            autoFocus={item.id !== 1}
          /> */}

          <AdditionButton>
            {item.id === 1 ? (
              <ButtonIcon onPress={onAddField}>
                <AntDesign name="plus" size={22} color={Colors.white} />
              </ButtonIcon>
            ) : (
              <ButtonIcon onPress={() => onRemoveField(item.id)}>
                <AntDesign name="minus" size={22} color={Colors.white} />
              </ButtonIcon>
            )}
          </AdditionButton>
        </Field>
      ))}

      <Save>
        <Button
          theme="secondary"
          text="Cохранить"
          onPress={() => onSave(fields)}
          useLoader={isLoading}
          disabled={!isValid}
        />
      </Save>
    </CenterModal>
  );
};

const Field = styled.View`
  margin-bottom: 10px;
`;

const AdditionButton = styled.View`
  position: absolute;
  top: 3px;
  right: 0;
  z-index: 100;
`;

const Save = styled.View`
  margin-top: 30px;
`;
