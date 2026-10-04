import { copyFile, writeFile } from 'node:fs/promises';

const output = new URL('../dist/github-pages/browser/', import.meta.url);

// Preserve the original URL on direct visits to Angular routes. GitHub still
// returns HTTP 404 for unknown paths; Angular renders its own not-found view.
await copyFile(new URL('index.csr.html', output), new URL('404.html', output));
await writeFile(new URL('.nojekyll', output), '');
