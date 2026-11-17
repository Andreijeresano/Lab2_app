import { useEffect, useId, useRef } from 'react';
import Icon from './Icon';

export default function DetailDialog({ title, eyebrow, onClose, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) onClose();
  }

  return (
    <dialog ref={dialogRef} className="detail-dialog" aria-labelledby={titleId} onClick={handleBackdropClick} onCancel={event => { event.preventDefault(); onClose(); }}>
      <div className="dialog-header"><div>{eyebrow && <p className="dialog-eyebrow">{eyebrow}</p>}<h2 className="dialog-title" id={titleId}>{title}</h2></div><button type="button" className="icon-button" aria-label="Close details" onClick={onClose} autoFocus><Icon name="x" /></button></div>
      <div className="dialog-body">{children}</div>
    </dialog>
  );
}
