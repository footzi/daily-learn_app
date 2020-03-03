import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Item } from 'native-base';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import { BottomModal, ButtonLoader } from '@components';

const initial = {
  en: '',
  ru: [{ id: 1, value: '' }]
};

export const AddWord = ({ isOpenModal, closeModal, onSaveWord }) => {
  const [isValid, setIsValid] = useState(false);
  const [fields, setFields] = useState(initial);

  const onChangeInput = (text, name, id) => {
    if (name === 'ru') {
      const updates = fields.ru.map(item => {
        if (item.id === id) {
          item.value = text;
        }

        return item;
      });

      setFields({
        ...fields,
        ru: updates
      });
    }

    if (name === 'en') {
      setFields({
        ...fields,
        en: text
      });
    }
  };

  const onAddField = () => {
    const id = fields.ru.length + 1;
    setFields({
      ...fields,
      ru: [...fields.ru, { id, value: '' }]
    });
  };

  const onRemoveField = id => {
    const updates = fields.ru.filter(item => item.id !== id);
    setFields({
      ...fields,
      ru: updates
    });
  };

  const onSave = () => {
    onSaveWord(fields);
    setFields(initial);
  };

  useEffect(() => {
    setIsValid(fields.ru && fields.en);
  }, [fields]);

  return (
    <BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title="Добавить слово">
      <Item inlineLabel>
        <Input placeholder="English" onChangeText={text => onChangeInput(text, 'en')} value={fields.en} />
      </Item>
      <Item inlineLabel>
        {/*<Input placeholder="Русский" onChangeText={text => onChangeInput(text, 'ru')} value={fields.ru} />*/}
      </Item>
      {fields.ru.map(item => (
        <Item key={item.id} inlineLabel>
          <Input
            placeholder={item.id === 1 ? 'Русский' : 'Добавить перевод'}
            onChangeText={text => onChangeInput(text, 'ru', item.id)}
            value={item.value}
          />
          {item.id === 1 ? (
            <Button transparent onPress={onAddField}>
              <Icon name="add" />
            </Button>
          ) : (
            <Button transparent onPress={() => onRemoveField(item.id)}>
              <Icon name="remove" />
            </Button>
          )}
        </Item>
      ))}

      <Save>
        <ButtonLoader
          success={!!isValid}
          name="Cохранить"
          width={130}
          onPress={() => onSave(fields)}
          disabled={!isValid}
        />
      </Save>
    </BottomModal>
  );
};

const Save = styled.View`
  margin-top: 30px;
  align-items: center;
`;
