import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const source = join('public', '404.html');
const out = 'out';

if (existsSync(source) && existsSync(out)) {
  copyFileSync(source, join(out, '404.html'));
  mkdirSync(join(out, '404'), { recursive: true });
  copyFileSync(source, join(out, '404', 'index.html'));
}
