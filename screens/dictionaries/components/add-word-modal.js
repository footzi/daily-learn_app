import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PlusIcon from '@/assets/icons/plus.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import { NewColors as Colors } from '@constants';
import { Button, CenterModal, Input, ButtonIcon } from '@/components';

export const AddWordModal = ({ closeModal, onSaveWord, isOpenModal, isLoading }) => {
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

  const onSave = async () => {
    await onSaveWord(fields);
    setFields(initial);
  };

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
    <CenterModal isOpenModal={isOpenModal} closeModal={closeModal} title="Добавляем новое слово">
      <Container>
        <Field>
          <Input
            theme="bordered"
            placeholder="Слово"
            onChangeText={(text) => onChangeInput(text, 'name')}
            value={fields.name}
          />
        </Field>

        {fields.translate.map((item) => (
          <Field key={item.id}>
            <Input
              theme="bordered"
              placeholder="Перевод"
              onChangeText={(text) => onChangeInput(text, 'translate', item.id)}
              value={item.value}
              autoFocus={item.id !== 1}
            />

            {item.id === 1 ? (
              <ButtonAdd onPress={() => onAddField(item.id)}>
                <PlusIcon color={Colors.white} width={14} height={14} />
              </ButtonAdd>
            ) : (
              <ButtonAdd onPress={() => onRemoveField(item.id)}>
                <MinusIcon color={Colors.white} width={14} height={14} />
              </ButtonAdd>
            )}
          </Field>
        ))}

        <Save>
          <Button
            isLoading={isLoading}
            width="100%"
            theme="secondary"
            text="Добавить"
            onPress={() => onSave(fields)}
            disabled={!isValid}
          />
        </Save>
      </Container>
    </CenterModal>
  );
};

const Container = styled.View``;

const Field = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const ButtonAdd = styled(ButtonIcon)`
  position: absolute;
  right: 0;
  top: -5px;
`;

const Save = styled.View`
  margin-top: 42px;
`;
