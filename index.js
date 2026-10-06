// Match the original Apple timestamp style in the visitor's device timezone.
const clock = document.querySelector('#clock');
const clockFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
  hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short'
});
function updateClock() {
  const now = new Date();
  const parts = Object.fromEntries(clockFormatter.formatToParts(now).map(part => [part.type, part.value]));
  clock.textContent = `${parts.month} ${parts.day}, ${parts.year} ${parts.hour}:${parts.minute} ${parts.dayPeriod} ${parts.timeZoneName}`;
  clock.dateTime = now.toISOString();
}
updateClock();
setInterval(updateClock, 1000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateClock();
});
