import styled from 'vue-styled-components';

const props = {
  width: String,
  height: String,
  padding: String,
  direction: String,
  justify: String,
  align: String,
};

const Box = styled('div', props)`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  width: ${({ width }) => width || '50%'};
  height: ${({ height }) => height || '50%'};
  padding: ${({ padding }) => padding || '0'}; 
  border: 1px solid black;
`;

export default Box;