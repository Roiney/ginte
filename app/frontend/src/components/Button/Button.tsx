import {
  Button as BlueprintButton,
  ButtonProps,
  Colors,
} from '@blueprintjs/core';
import { useCallback } from 'react';

interface CustomButtonProps extends ButtonProps {
  customColor?: string;
}

const Button = (props: CustomButtonProps) => {
  const isPrimaryButton = !props?.minimal && !props.outlined;

  const getBackgroundColor = useCallback(() => {
    if (props.customColor) return props.customColor;
    if (isPrimaryButton && props.disabled) return Colors.GRAY1;
    if (isPrimaryButton && !props.disabled) return Colors.DARK_GRAY1;

    return props.minimal ? 'transparent' : 'white';
  }, [isPrimaryButton, props.disabled, props.minimal, props.customColor]);

  const getTextColor = useCallback(() => {
    if (props.customColor === 'white') return 'black';
    return isPrimaryButton ? Colors.WHITE : 'black';
  }, [isPrimaryButton, props.customColor]);

  return (
    <BlueprintButton
      {...props}
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        fill: getTextColor(),
      }}
    >
      {props.children}
    </BlueprintButton>
  );
};

export default Button;
