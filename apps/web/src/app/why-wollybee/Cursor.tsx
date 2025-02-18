import React, { useEffect } from 'react';
import gsap from 'gsap';

const Cursor = ({
  cursorRef,
  defaultCursorColor,
}: {
  cursorRef: any;
  defaultCursorColor: string;
}) => {
  useEffect(() => {
    const updateCursorPosition = (e: any) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - 20 / 3,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed md:block hidden top-0 left-0 h-[20px] w-[20px] ${defaultCursorColor}  rounded-full z-[11] pointer-events-none cursor-default`}
    ></div>
  );
};

export default Cursor;
