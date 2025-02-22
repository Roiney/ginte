import {
  FormGroup as BlueprintFormGroup,
  FormGroupProps,
} from '@blueprintjs/core';

const FormGroup = (props: FormGroupProps) => {
  return (
    <BlueprintFormGroup
      style={{
        margin: '0px',
      }}
      {...props}
    >
      {props.children}
    </BlueprintFormGroup>
  );
};

export default FormGroup;
