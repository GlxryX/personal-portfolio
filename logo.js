// One vector design, rendered with Canvas and exported as a standalone SVG.
(() => {
  const letters = ["M50 630Q35 630 35 616Q35 608 38.5 605.5Q42 603 48.0 602.5Q54 602 62.5 601.5Q71 601 80 598Q102 591 102 559V548L84 190Q82 145 79.5 114.5Q77 84 72.5 65.0Q68 46 60.5 37.5Q53 29 41 29Q38 29 35.5 29.5Q33 30 29 30Q12 30 12 16Q12 -1 35 -1Q47 -1 61.5 1.0Q76 3 94 3Q108 3 122.0 1.0Q136 -1 150 -1Q174 -1 174 14Q174 30 161 30Q156 30 151.5 29.5Q147 29 142 29Q117 29 111.5 51.5Q106 74 106 121Q106 138 106.5 155.5Q107 173 108 190L123 514Q123 528 126 528Q131 528 133 524L295 28Q298 20 302 20Q306 20 309 28L472 521Q474 528 478 528Q480 528 480 514L490 117V93Q490 67 487.5 55.5Q485 44 475 39Q465 33 455.5 32.0Q446 31 438.5 30.0Q431 29 426.0 26.5Q421 24 421 16Q421 0 442 0Q453 0 472.0 2.5Q491 5 521 5Q550 5 570.0 2.5Q590 0 601 0Q621 0 621 14Q621 23 617.0 26.0Q613 29 606.5 30.0Q600 31 591.0 31.5Q582 32 573 36Q565 40 561.0 44.0Q557 48 555.5 54.5Q554 61 553.5 70.5Q553 80 553 94L540 531V552Q540 575 543.0 583.5Q546 592 557 597Q566 601 575.0 601.5Q584 602 590.5 602.5Q597 603 601.5 605.5Q606 608 606 616Q606 630 591 630H490Q482 630 479.0 625.0Q476 620 474 612L329 165Q326 156 322 156Q318 156 315 164L166 620Q164 628 159.5 629.0Q155 630 148 630Z", "M161 379V556Q161 584 172.5 595.0Q184 606 226 606Q293 606 328.0 571.5Q363 537 363 474Q363 414 321.5 382.0Q280 350 199 350Q176 350 168.5 354.5Q161 359 161 379ZM325 349Q437 379 437 477Q437 559 378.5 595.0Q320 631 202 631Q19 631 19 600Q19 586 31 586Q39 586 46.5 588.5Q54 591 64 591Q79 591 86.0 582.5Q93 574 93 552V94Q93 86 92.5 81.0Q92 76 92 74Q92 54 84.0 42.5Q76 31 53 31Q29 31 29 16Q29 0 48 0Q59 0 77.0 3.0Q95 6 123 6Q159 6 201.5 -1.5Q244 -9 295 -9Q334 -9 366.5 4.5Q399 18 421.5 42.5Q444 67 456.5 100.5Q469 134 469 174Q469 240 431.5 286.0Q394 332 325 349ZM175 326H245Q319 326 356.5 285.5Q394 245 394 173Q394 101 355.5 60.5Q317 20 251 20Q200 20 180.5 38.5Q161 57 161 98V309Q161 319 163.5 322.5Q166 326 175 326Z"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title"><title id="title">Mihir Balsara monogram</title><defs><linearGradient id="silver" x2="0" y2="1"><stop stop-color="#fff"/><stop offset=".45" stop-color="#f1f3f5"/><stop offset=".58" stop-color="#dde2e7"/><stop offset="1" stop-color="#f8fafb"/></linearGradient><linearGradient id="shine" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect x="2" y="3" width="60" height="60" rx="14" fill="#000" opacity=".07"/><rect x="2" y="1" width="60" height="60" rx="14" fill="url(#silver)" stroke="#a4a9af"/><rect x="5" y="3" width="54" height="27" rx="12" fill="url(#shine)"/><g fill="#25282c"><path d="${letters[0]}" transform="translate(10 44) scale(.04 -.04)"/><path d="${letters[1]}" transform="translate(35 44) scale(.04 -.04)"/></g></svg>`;
  function drawLogo(canvas, size = 40, pixelRatio = globalThis.devicePixelRatio || 1) {
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(size * pixelRatio / 64, size * pixelRatio / 64);
    const box = (x, y, width, height, radius) => {
      ctx.beginPath(); ctx.roundRect(x, y, width, height, radius);
    };
    box(2, 3, 60, 60, 14); ctx.fillStyle = '#00000012'; ctx.fill();
    const silver = ctx.createLinearGradient(0, 1, 0, 61);
    [[0, '#fff'], [.45, '#f1f3f5'], [.58, '#dde2e7'], [1, '#f8fafb']].forEach(([stop, color]) => silver.addColorStop(stop, color));
    box(2, 1, 60, 60, 14); ctx.fillStyle = silver; ctx.fill(); ctx.strokeStyle = '#a4a9af'; ctx.lineWidth = 1; ctx.stroke();
    const shine = ctx.createLinearGradient(0, 3, 0, 30);
    shine.addColorStop(0, '#ffffffe6'); shine.addColorStop(1, '#ffffff00');
    box(5, 3, 54, 27, 12); ctx.fillStyle = shine; ctx.fill();
    letters.forEach((path, i) => {
      ctx.save(); ctx.translate(i === 0 ? 10 : 35, 44); ctx.scale(.04, -.04);
      ctx.fillStyle = '#25282c'; ctx.fill(new Path2D(path)); ctx.restore();
    });
  }
  if (typeof module !== 'undefined') module.exports = {svg};
  if (typeof document !== 'undefined') {
    window.portfolioLogo = {svg, drawLogo};
    const canvas = document.querySelector('#logo');
    if (canvas) drawLogo(canvas);
  }
})();
