import { sites } from '@openai/sites-vite-plugin';
import { cloudflare } from '@cloudflare/vite-plugin';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig({
  server: { host: "0.0.0.0", allowedHosts: ["terminal.local"] },
  plugins: [
    vinext(),
    sites(),
    cloudflare({
      viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
      config: {
        main: 'vinext/server/fetch-handler',
        compatibility_flags: ['nodejs_compat'],
      },
    }),
  ],
});
