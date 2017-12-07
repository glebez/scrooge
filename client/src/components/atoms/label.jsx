import glamorous from 'glamorous';

const Label = glamorous.label({
  marginBottom: '20px',
},
({ verticallyCentered }) => {
  if (verticallyCentered) {
    return { display: 'flex', alignItems: 'center' };
  }
  return {};
});

export default Label;
