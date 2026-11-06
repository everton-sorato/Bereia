const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
require('../assets/js/reminder-calendar.js');

test('calendar selects the next local occurrence after the last reminder of the week', () => {
  const content = BereiaReminderCalendar.build({
    time: '04:30', days: [1, 5], uid: 'test@bereia',
    title: 'Oração', description: 'Leia, ore; agradeça. '.repeat(10)
  }, new Date(2026, 10, 6, 6)); // Friday after 04:30
  assert.match(content, /DTSTART:20261109T043000\r\n/);
  assert.match(content, /RRULE:FREQ=WEEKLY;BYDAY=MO,FR\r\n/);
  assert.match(content, /BEGIN:VALARM\r\nACTION:DISPLAY\r\nTRIGGER:PT0S/);
  assert.ok(content.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
  assert.match(content.replace(/\r\n /g,''), /Leia\\, ore\\; agradeça/);
  assert.throws(() => BereiaReminderCalendar.build({time:'04:30',days:[]}), /dia/);
});

test('restarted worker serves downloaded shell and local assets with network unavailable', async () => {
  const scope = 'https://example.org/Bereia/';
  const stores = new Map();
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const files = stores.get(name);
      return {
        async addAll(urls) {
          for (const url of urls) {
            const file = url === './' ? 'index.html' : url.split('?')[0];
            files.set(new URL(url,scope).href, fs.readFileSync(path.join(root,file)));
          }
        },
        async match(request, options) {
          const url = new URL(request.url || request, scope);
          if (options?.ignoreSearch) url.search = '';
          const bytes = files.get(url.href);
          return bytes && new Response(bytes);
        }
      };
    }
  };
  function restart() {
    const handlers = {};
    vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'), {
      self:{registration:{scope},skipWaiting(){},addEventListener:(event,fn)=>handlers[event]=fn},
      fetch:async()=>{throw Error('offline')}, location:new URL(scope), caches, URL, Response, AbortController, setTimeout, clearTimeout
    });
    return handlers;
  }
  let pending;
  restart().install({waitUntil: promise=>pending=promise});
  await pending;
  const worker = restart();
  async function read(url,mode) {
    worker.fetch({request:{url:new URL(url,scope).href,mode,method:'GET'},respondWith:promise=>pending=promise});
    return pending;
  }
  assert.match(await (await read('?app=1','navigate')).text(), /id="bibleReader"/);
  assert.match(await (await read('assets/js/scripture-store.js?v=132','cors')).text(), /BereiaScriptureFactory/);
  assert.equal((await read('ausente','navigate')).status,503);
});
