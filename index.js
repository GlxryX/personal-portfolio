// Match the original Apple timestamp style in the visitor's device timezone.
const clock = document.querySelector('#clock');
const clockFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
  hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short'
});
function updateClock() {
  const now = new Date();
  const parts = Object.fromEntries(clockFormatter.formatToParts(now).map(part => [part.type, part.value]));
  const display = `${parts.month} ${parts.day}, ${parts.year} ${parts.hour}:${parts.minute} ${parts.dayPeriod} ${parts.timeZoneName}`;
  if (clock.textContent !== display) {
    const text = clock.firstChild || clock.appendChild(document.createTextNode(''));
    const selection = window.getSelection();
    const saved = selection && (selection.anchorNode === text || selection.focusNode === text)
      ? {anchor: selection.anchorNode, anchorOffset: selection.anchorOffset,
         focus: selection.focusNode, focusOffset: selection.focusOffset}
      : null;
    const oldLength = text.length;
    text.replaceData(0, oldLength, display);
    if (saved) {
      const offset = (node, value) => node !== text ? value
        : value === oldLength ? text.length : Math.min(value, text.length);
      selection.setBaseAndExtent(saved.anchor, offset(saved.anchor, saved.anchorOffset),
        saved.focus, offset(saved.focus, saved.focusOffset));
    }
  }
  clock.dateTime = now.toISOString();
}
updateClock();
setInterval(updateClock, 1000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateClock();
});

const contactDialog = document.querySelector('#contact-dialog');
document.querySelector('#contact').addEventListener('click', () => {
  ['left', 'top', 'inset', 'margin', 'position'].forEach(property => contactDialog.style.removeProperty(property));
  contactDialog.showModal();
});
contactDialog.addEventListener('click', (event) => {
  const bounds = contactDialog.getBoundingClientRect();
  if (event.target === contactDialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
       event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    contactDialog.close();
  }
});

const contactTitlebar = document.querySelector('.contact-titlebar');
let drag = null;
function positionContact(left, top) {
  contactDialog.style.position = 'fixed';
  contactDialog.style.inset = 'auto';
  contactDialog.style.margin = '0';
  contactDialog.style.left = `${left}px`;
  contactDialog.style.top = `${top}px`;
}
contactTitlebar.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || !event.isPrimary || event.target.closest('.window-controls')) return;
  const bounds = contactDialog.getBoundingClientRect();
  drag = {pointerId: event.pointerId, x: event.clientX - bounds.left, y: event.clientY - bounds.top};
  contactTitlebar.setPointerCapture(event.pointerId);
  event.preventDefault();
});
contactTitlebar.addEventListener('pointermove', (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  positionContact(event.clientX - drag.x, event.clientY - drag.y);
});
function endContactDrag() {
  if (drag && contactTitlebar.hasPointerCapture(drag.pointerId)) contactTitlebar.releasePointerCapture(drag.pointerId);
  drag = null;
}
contactTitlebar.addEventListener('pointerup', endContactDrag);
contactTitlebar.addEventListener('pointercancel', endContactDrag);
contactTitlebar.addEventListener('lostpointercapture', endContactDrag);
contactDialog.addEventListener('close', endContactDrag);
