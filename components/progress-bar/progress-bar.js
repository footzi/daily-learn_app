import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';

const ProgressBar = ({ progress }) => (
  <View>
    <Rail>
      <Bar progress={progress} />
    </Rail>
  </View>
);

const View = styled.View`
  flex: 1;
`;

const Rail = styled.View`
  border-radius: 4px;
  height: 10px;
  overflow: hidden;
  background-color: ${Colors.gray};
`;

const Bar = styled.View`
  height: 10px;
  background-color: ${p => (p.progress < 50 && Colors.warning) || (p.progress >= 50 && Colors.success)};
  width: ${p => `${p.progress}%`};
`;

export default ProgressBar;
