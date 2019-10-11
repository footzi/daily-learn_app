import React from 'react';
import styled from 'styled-components';
import { Text, Content, Button, List, ListItem, Icon, H3 } from 'native-base';

const lists = [
  {
    id: 1,
    name: 'Словарь 1'
  },
  {
    id: 2,
    name: 'Словарь 2'
  },
  {
    id: 3,
    name: 'Словарь 3'
  },
  {
    id: 4,
    name: 'Словарь 4'
  }
];

const DictionariesScreen = ({ navigation }) => {
  const onCreate = () => {
    navigation.navigate('CreateDictionary');
  };

  const onPreview = (id, name) => {
    navigation.navigate('PreviewDictionary', {
      id,
      name
    });
  };

  const onSettings = id => {
    navigation.navigate('SettingsDictionary', {
      id
    });
  };

  return (
    <Content>
      <Container>
        {!lists.length ? (
          <H3 style={{ textAlign: 'center' }}>У вас еще нет словаря(</H3>
        ) : (
          <List>
            {lists.map(item => (
              <ListItem key={item.id} onPress={() => onPreview(item.id, item.name)} noIndent>
                <Text>{item.name}</Text>
                <Button
                  warning
                  transparent
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onPress={() => onSettings(item.id)}>
                  <Icon name="settings" />
                </Button>
              </ListItem>
            ))}
          </List>
        )}

        <Create>
          <Button info onPress={onCreate}>
            <Text>Создать</Text>
          </Button>
        </Create>
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const Create = styled.View`
  margin-top: 20px;
  flex: 1;
  align-items: center;
`;

DictionariesScreen.navigationOptions = {
  title: 'Словари'
};

export default DictionariesScreen;
