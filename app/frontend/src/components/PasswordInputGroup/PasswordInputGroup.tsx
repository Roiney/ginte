import { InputGroup, InputGroupProps } from '@blueprintjs/core';
import { useState } from 'react';
import Button from '../Button/Button';

const PasswordInputGroup = (props: InputGroupProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <InputGroup
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightElement={
        <Button
          minimal
          icon={showPassword ? 'eye-off' : 'eye-open'}
          onClick={() => setShowPassword(!showPassword)}
        />
      }
    />
  );
};

export default PasswordInputGroup;
