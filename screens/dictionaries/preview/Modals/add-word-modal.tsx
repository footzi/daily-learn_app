import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { CenterModal, Button, Input, ButtonIcon } from '@components';
import { Colors, LOADING_ITEMS } from '@constants';
import { AddWordModalProps, SaveFieldsWord } from '../interfaces';

export const AddWordModal: React.FC<AddWordModalProps> = ({ isOpenModal, isLoading, closeModal, onSaveWord }) => {
  const initial = {
    name: '',
    translate: [{ id: 1, value: '' }],
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const [fields, setFields] = useState<SaveFieldsWord>(initial);

  const onChangeInput = (text, id = null) => {
    if (id) {
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

    if (!id) {
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
    <CenterModal theme="primary" title="Добавьте слово" isOpenModal={isOpenModal} closeModal={closeModal}>
      <Field>
        <Input
          theme="secondary"
          placeholder="English"
          value={fields.name}
          onChangeText={(text) => onChangeInput(text)}
        />
      </Field>

      {fields.translate.map((item) => (
        <Field key={item.id}>
          <Input
            theme="secondary"
            placeholder={item.id === 1 ? 'Русский' : 'Добавить перевод'}
            value={item.value}
            onChangeText={(text) => onChangeInput(text, item.id)}
            paddingRight={25}
            autoFocus={item.id !== 1}
          />

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
        <Button theme="secondary" text="Сохранить" onPress={onSave} useLoader={isLoading} disabled={!isValid} />
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
