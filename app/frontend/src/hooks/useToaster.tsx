import { useCallback } from 'react';
import Toaster from '../components/Toaster/Toaster';
import { IconName, Intent } from '@blueprintjs/core';

const useToaster = () => {
  const showToasterMessage = useCallback(
    async ({
      icon,
      intent,
      message,
    }: {
      message: string;
      intent: Intent;
      icon: IconName;
    }) => {
      (await Toaster).show({
        message,
        intent,
        icon,
      });
    },
    [],
  );

  return {
    showErrorMessage: (message: string) =>
      showToasterMessage({
        message,
        intent: Intent.DANGER,
        icon: 'warning-sign',
      }),
    showSuccessMessage: (message: string) =>
      showToasterMessage({
        message,
        intent: Intent.SUCCESS,
        icon: 'tick-circle',
      }),
  };
};

export default useToaster;
