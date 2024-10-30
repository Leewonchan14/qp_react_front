import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const AutoResizeTextArea = React.forwardRef(function AutoResizeTextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref?,
) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [observe, setObserve] = useState(0);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(textAreaRef.current);
    } else {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
        textAreaRef.current;
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!textAreaRef?.current) return;

    const cloneNode = textAreaRef.current.cloneNode(
      true,
    ) as HTMLTextAreaElement;

    (textAreaRef.current as Node).parentNode!.appendChild(cloneNode);

    cloneNode.style.height = 'auto';
    textAreaRef.current.style.height = `${cloneNode.scrollHeight}px`;

    (textAreaRef.current as Node).parentNode!.removeChild(cloneNode);
  }, [textAreaRef.current?.value, observe]);

  return (
    <textarea
      {...props}
      onChange={(e) => {
        if (!props.onChange) return;
        setObserve((prev) => (prev += 1));
        props.onChange(e);
      }}
      ref={textAreaRef}
      style={{ overflow: 'hidden', resize: 'none' }}
    />
  );
});

export default React.memo(AutoResizeTextArea);
