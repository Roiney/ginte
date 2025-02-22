import { OverlayToaster, ToastProps } from '@blueprintjs/core';
import React from 'react';
import { createRoot } from 'react-dom/client';

class AppToaster {
  toaster: React.RefObject<OverlayToaster>;

  constructor() {
    this.toaster = React.createRef<OverlayToaster>();

    const container = document.getElementById('toaster');
    if (!!container) {
      const toaster = createRoot(container);
      toaster.render(<OverlayToaster ref={this.toaster} />);
    }
  }

  public show(options: ToastProps) {
    this.toaster.current?.show({ ...options });
  }
}

const Toaster = new AppToaster();
export default Toaster;
