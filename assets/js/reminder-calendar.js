/* Export a recurring reminder for calendars that support iCalendar. */
(function () {
  const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  function textValue(value) {
    return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n')
      .replace(/;/g, '\\;').replace(/,/g, '\\,');
  }

  function foldLine(text) {
    const encoder = new TextEncoder();
    let line = '', length = 0;
    const lines = [];
    for (const character of text) {
      const size = encoder.encode(character).length;
      if (length + size > 75) {
        lines.push(line);
        line = ' ';
        length = 1;
      }
      line += character;
      length += size;
    }
    return [...lines, line].join('\r\n');
  }

  function build({time, days, title, description, uid}, now = new Date()) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw Error('Escolha um horário válido.');
    if (!days.length || !days.every(d => Number.isInteger(d) && weekdays[d])) {
      throw Error('Escolha ao menos um dia para a agenda.');
    }
    const [hour, minute] = time.split(':').map(Number);
    const start = new Date(now);
    start.setHours(hour, minute, 0, 0);
    while (start < now || !days.includes(start.getDay())) start.setDate(start.getDate() + 1);
    const pad = n => String(n).padStart(2, '0');
    const date = String(start.getFullYear()) + pad(start.getMonth() + 1) + pad(start.getDate());
    const repeat = [...new Set(days)].sort().map(d => weekdays[d]).join(',');
    const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bereia//Lembretes//PT-BR',
      'BEGIN:VEVENT', 'UID:' + uid, 'DTSTAMP:' + stamp,
      'DTSTART:' + date + 'T' + time.replace(':','') + '00', 'DURATION:PT5M',
      'RRULE:FREQ=WEEKLY;BYDAY=' + repeat, 'SUMMARY:' + textValue(title),
      'DESCRIPTION:' + textValue(description), 'TRANSP:TRANSPARENT', 'BEGIN:VALARM',
      'ACTION:DISPLAY', 'TRIGGER:PT0S', 'DESCRIPTION:' + textValue(title),
      'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'
    ].map(foldLine).join('\r\n') + '\r\n';
  }
  globalThis.BereiaReminderCalendar = {build};
})();
