import React from 'react';
import { useScroll } from '../../hooks/common/useScroll';

export default function BottomSheet({ children }: React.PropsWithChildren) {
  const { isScrollDowning } = useScroll(20);
  return (
    <div
      className={`z-10 pc:hidden fixed bottom-0 left-0 right-0 transition-all duration-500 ${isScrollDowning ? 'translate-y-full' : 'translate-y-0'}`}
    >
      {children}
    </div>
  );
}
