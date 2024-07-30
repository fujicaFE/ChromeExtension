import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === 'staging'
      ? '[INTERNAL] Fujica Tools'
      : 'Fujica Tools',
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: {
    "default_popup": "popup/index.html"
  },
  background: {
    "service_worker": "/background/service-worker.ts"
  },
  content_scripts: [
    {
      "js": [
        "/content/content.ts",
        "/contentPage/index.ts"
      ],
      "matches": [
        "https://gatewayservicev2.fujica.com.cn/*"
      ],
      "all_frames": true,
      "run_at": "document_end",
      "match_about_blank": true
    }
  ],
  web_accessible_resources: [
    {
      "resources": ["contentPage/index.html", "assets/*", "js/*"],
      "matches": ["https://gatewayservicev2.fujica.com.cn/*"],
      "use_dynamic_url": true
    }
  ]
}))