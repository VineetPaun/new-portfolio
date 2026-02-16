'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatBubble = dynamic(() => import('@/components/common/ChatBubble'), {
  ssr: false,
});

export default function LazyChatBubble() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const onIdle = () => setShouldRender(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === 'function') {
      const idleId = idleWindow.requestIdleCallback(onIdle, { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = setTimeout(onIdle, 1200);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!shouldRender) return null;

  return <ChatBubble />;
}
