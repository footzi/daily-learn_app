import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Text, Content, Button, List, ListItem, Icon, H3 } from 'native-base';

const mapStateToProps = state => ({
  data: state.data
});

const DictionariesScreen = ({ data, navigation }) => {
  const { dictionaries } = data;

  const onCreate = () => {
    navigation.navigate('CreateDictionary');
  };

  const onPreview = dictionary => {
    navigation.navigate('PreviewDictionary', { dictionary });
  };

  const onSettings = dictionary => {
    navigation.navigate('SettingsDictionary', { dictionary });
  };

  return (
    <Content>
      <Container>
        {!dictionaries.length && <H3 style={{ textAlign: 'center' }}>У вас еще нет словаря(</H3>}

        <List>
          {dictionaries.map(item => (
            <ListItem key={item.id} onPress={() => onPreview(item)} noIndent>
              <Text>{item.name}</Text>
              <Button
                warning
                transparent
                style={{ position: 'absolute', top: 0, right: 0 }}
                onPress={() => onSettings(item)}>
                <Icon name="settings" />
              </Button>
            </ListItem>
          ))}
        </List>

        <Create>
          <Button info onPress={onCreate}>
            <Text>{dictionaries.length ? 'Создать новый' : 'Создать'}</Text>
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

export default connect(mapStateToProps)(DictionariesScreen);
