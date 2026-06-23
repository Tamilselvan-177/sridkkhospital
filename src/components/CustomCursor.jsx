import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [follower, setFollower] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only show custom cursor on pointer-accurate (non-touch) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsMobile(false);

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    let followerTimeout;
    const moveFollower = (e) => {
      clearTimeout(followerTimeout);
      followerTimeout = setTimeout(() => {
        setFollower({ x: e.clientX, y: e.clientY });
      }, 80);
    };

    const handleHoverOn = () => setIsHovering(true);
    const handleHoverOff = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', moveFollower);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const interactables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label'
    );
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverOn);
      el.addEventListener('mouseleave', handleHoverOff);
    });

    return () => {
      clearTimeout(followerTimeout);
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', moveFollower);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverOn);
        el.removeEventListener('mouseleave', handleHoverOff);
      });
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isClicking ? '8px' : '10px',
          height: isClicking ? '8px' : '10px',
          backgroundColor: '#38bdf8',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.1s, height 0.1s',
          boxShadow: '0 0 8px #38bdf8, 0 0 16px #38bdf8',
        }}
      />
      {/* Follower ring */}
      <div
        style={{
          position: 'fixed',
          left: follower.x,
          top: follower.y,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: `2px solid ${isHovering ? '#0ea5e9' : '#7dd3fc'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
          backgroundColor: isHovering ? 'rgba(56,189,248,0.08)' : 'transparent',
        }}
      />
    </>
  );
}
