import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Content, ListItem, Left, Text, Right, Radio, Button, H3 } from 'native-base';
import { createVerbs } from './helpers';
import CartVerb from './organism/cart-verb';
import * as effects from '../effects';

const mapStateToProps = state => ({
  irregularVerbs: state.data.irregularVerbs
});

const mapDispatchToProps = {
  changeCountVerb: effects.changeCountVerb
};

const IrregularTrainingScreen = ({ navigation, irregularVerbs, changeCountVerb }) => {
  const verbs = createVerbs(irregularVerbs);

  const onSave = verb => {
    const body = {
      verb_id: verb.id,
      form: verb.form
    };

    changeCountVerb({ navigation, body });
  };

  return (
    <Content>
      <Container>
        {verbs.map((item) => (
          <Fragment key={item.id_unique}>
            {item.isShow && <CartVerb verb={item} onSave={onSave}/>}
          </Fragment>
        ))}
      </Container>
    </Content>

  )
};

IrregularTrainingScreen.navigationOptions = ({ navigation }) => ({
  title: 'Неправильные глаголы'
});

const Container = styled.View`
  padding: 10px;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IrregularTrainingScreen);
