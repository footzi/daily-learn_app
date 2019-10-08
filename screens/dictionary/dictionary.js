import React from 'react';
import styled from 'styled-components';
import { Text, Content, Button, Input, Item } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ButtonLoader from '../../components/buttons';

const DictionaryScreen = () => {
  return (
    <Content>
      <Container>
      <Grid>
                <Col size={75} style={{ height: 100}}>
                <Text>Создать словарь</Text>
                  {/* <Item regular>
                    <Input placeholder="Название" />
                  </Item> */}
                </Col>
                <Col size={25} style={{ height: 100}}>
                  <Text>Создать словарь</Text>
                  {/* <Button info>
                    <Text>Создать словарь</Text>
                  </Button> */}
                  {/* <ButtonLoader success name="Cоздать" width={100} /> */}
                </Col>
              </Grid>
        <Create>
          <Button info>
            <Text>Создать словарь</Text>
          </Button>
          <NewDict>
          
            <Top>
              
            </Top>
          </NewDict>
        </Create>
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const Create = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const NewDict = styled.View``;

const Top = styled.View`
  /* flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center; */
  margin-top: 10px;
`;

DictionaryScreen.navigationOptions = {
  title: 'Словари'
};

export default DictionaryScreen;
