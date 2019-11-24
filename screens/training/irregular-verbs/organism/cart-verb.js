import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Icon, Item, H3, Input, Button, Text } from 'native-base';
import ProgressBar from '../../../../components/progress-bar';
import { SETTINGS } from "@constants/settings";

const UNKNOWN = 'UNKNOWN';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

const CartVerb = ({ verb, onSave }) => {
  const [fields, setIsFields] = useState({
    form: '',
    translate: '',
  });
  
  const [isSee, setIsSee] = useState(false);
  const [result, setIsResult] = useState(UNKNOWN);
  
  const onCheck = () => {
    const isForm = fields.form.toLowerCase() === verb.question.toLowerCase();
    const isTranslate = fields.translate.toLowerCase() === verb.translate.toLowerCase();
    
    if (isForm && isTranslate) {
      setIsResult(SUCCESS);
      onSave(verb);
    } else {
      setIsResult(ERROR)
    }
  };
  
  const onChangeAnswer = (name, text) => {
    setIsFields({
      ...fields,
      [name]: text
    })
  };
  
  const onSee = () => setIsSee(true);
  
  return (
    <Card style={{marginBottom: 20}}>
       <CardWrapper>
          <List>
            <ListItem>
              <Text>{verb.form !== 'first' || isSee ? verb.first : '??'}</Text>
            </ListItem>
            <ListItem>
              <Text>{verb.form !== 'second' || isSee ? verb.second : '??'}</Text>
            </ListItem>
            <ListItem>
              <Text>{verb.form !== 'third' || isSee ? verb.third : '??'}</Text>
            </ListItem>
          </List>
         
         <ProgressWrapper>
           <ProgressBar progress={(verb.count / SETTINGS.attempt) * 100} />
         </ProgressWrapper>
         
         {!isSee &&
         <Answer>
           <Item>
             <Input
               placeholder='Форма'
               onChangeText={(text) => onChangeAnswer('form', text)}
               value={fields.form}
             />
           </Item>
           <Item>
             <Input
               placeholder='Перевод'
               onChangeText={(text) => onChangeAnswer('translate', text)}
               value={fields.translate}
             />
           </Item>
         </Answer>
         }
         
         {isSee && <Translate>{verb.translate}</Translate>}
         
         {!isSee && (
           <Actions>
             <Button
               disabled={result === UNKNOWN}
               success={result === SUCCESS}
               danger={result === ERROR}
               transparent>
               <Icon name="paw" style={{ fontSize: 40 }} />
             </Button>
             <Button warning transparent onPress={onCheck}>
               <Icon name="md-checkmark" style={{ fontSize: 40 }} />
             </Button>
             <Button danger transparent onPress={onSee}>
               <Icon name="md-eye" style={{ fontSize: 40 }} />
             </Button>
           </Actions>
         )}
       </CardWrapper>
    </Card>
  )
};

const List = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ListItem = styled.View``;

const CardWrapper = styled.View`
  padding: 20px;
`;

const Answer = styled.View`
  margin-top: 10px;
`;

const ProgressWrapper = styled.View`
  margin-top: 10px;
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-around;
`;

const Translate = styled.Text`
  flex: 1;
  margin-top: 20px;
  align-items: center;
  font-size: 20px;
  text-align: center;
`;

export default CartVerb;
