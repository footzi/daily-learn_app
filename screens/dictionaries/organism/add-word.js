import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Item } from 'native-base';
import styled from 'styled-components/native';
import { BottomModal, ButtonLoader } from '@components';

export const AddWord = ({ isOpenModal = true, closeModal = () => {}, onSaveWord = () => {} }) => {
  const initial = {
    name: '',
    translate: [{ id: 1, value: '' }],
  };
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
    <BottomModal isOpenModal={isOpenModal} closeModal={closeModal} title="Добавить слово">
      <Item inlineLabel>
        <Input
          placeholder="English"
          onChangeText={(text) => onChangeInput(text, 'name')}
          value={fields.name}
          autoFocus={fields.translate.length <= 1}
        />
      </Item>

      {fields.translate.map((item) => (
        <Item key={item.id} inlineLabel>
          <Input
            placeholder={item.id === 1 ? 'Русский' : 'Добавить перевод'}
            onChangeText={(text) => onChangeInput(text, 'translate', item.id)}
            value={item.value}
            autoFocus={item.id !== 1}
          />
          {item.id === 1 ? (
            <Button transparent et onPress={onAddField}>
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
