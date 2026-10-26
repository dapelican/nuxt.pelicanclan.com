import {
  fileURLToPath,
} from 'node:url';

import remarkHeadingId from './shared/markdown/remark-heading-id.js';

const getNonEmptyEnvironmentVariable = (name) => {
  const value = process.env[name]?.trim();

  return value || undefined;
};

const getTraceSampleRate = () => {
  const value = Number(getNonEmptyEnvironmentVariable('NUXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE') ?? 0.1);

  return Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0.1;
};

const sentry_dsn = getNonEmptyEnvironmentVariable('NUXT_PUBLIC_SENTRY_DSN');
const sentry_environment = getNonEmptyEnvironmentVariable('NUXT_PUBLIC_SENTRY_ENVIRONMENT');
const sentry_traces_sample_rate = getTraceSampleRate();
const sentry_auth_token = getNonEmptyEnvironmentVariable('SENTRY_AUTH_TOKEN');
const sentry_org = getNonEmptyEnvironmentVariable('SENTRY_ORG');
const sentry_project = getNonEmptyEnvironmentVariable('SENTRY_PROJECT');
const is_production = process.env.NODE_ENV === 'production';
const is_sentry_enabled = is_production && Boolean(sentry_dsn);
const can_upload_sentry_source_maps = is_sentry_enabled
  && Boolean(sentry_auth_token && sentry_org && sentry_project);

let sentry_ingest_origin;

if (sentry_dsn) {
  try {
    sentry_ingest_origin = new URL(sentry_dsn).origin;
  } catch {
    sentry_ingest_origin = undefined;
  }
}

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    ...(!is_production ? ['@nuxt/eslint'] : []),
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/plausible',
    '@nuxtjs/turnstile',
    ...(is_sentry_enabled ? ['@sentry/nuxt/module'] : []),
    'nuxt-auth-utils',
    'nuxt-security',
  ],
  // to prevent weird warnings in the console locally, set to false
  devtools: {
    enabled: false,
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/images/pelicanclan-0016x0016.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/pelicanclan-0032x0032.png',
        },
      ],
      // To make the browser have the same color as the brand color
      // meta: [
      //   {
      //     name: 'theme-color',
      //     content: '#97BF0D',
      //   },
      // ],
    },
  },
  css: ['~/assets/css/main.css'],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            light: 'github-light',
            dark: 'github-dark',
          },
          langs: [
            'javascript',
            'js',
            'jsx',
            'json',
            'ts',
            'tsx',
            'vue',
            'css',
            'html',
            'bash',
            'md',
            'mdc',
            'yaml',
          ],
        },
        rehypePlugins: {
          'rehype-external-links': {
            options: {
              rel: ['noopener', 'noreferrer'],
            },
          },
        },
        remarkPlugins: {
          'remark-heading-id': {
            src: fileURLToPath(new URL('./shared/markdown/remark-heading-id.js', import.meta.url)),
            instance: remarkHeadingId,
          },
        },
      },
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },
  // to make the environment variables declared in the .env file
  // available in the app folder (client-side) and the sever folder (server-side).
  // with the funtion useRuntimeConfig()
  runtimeConfig: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    EMAILABLE_API_KEY: process.env.EMAILABLE_API_KEY,
    SMTP2GO_API_KEY: process.env.SMTP2GO_API_KEY,
    SESSION_MAX_AGE_DAYS: process.env.SESSION_MAX_AGE_DAYS,
    public: {
      domain: process.env.DOMAIN,
      sentry_dsn,
      sentry_environment,
      sentry_traces_sample_rate,
    },
    turnstile: {
      // Dummy secret in dev so local checks do not call Siteverify.
      // CLOUDFLARE_TURNSTILE_SECRET_KEY replaces this in production.
      secretKey: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
        || (process.env.NODE_ENV === 'development'
          ? '1x0000000000000000000000000000000AA'
          : ''),
    },
    session: {
      // Implicitly used by nuxt-auth-utils to set the cookie lifespan
      maxAge: 60 * 60 * 24 * Number(process.env.SESSION_MAX_AGE_DAYS),
    },
  },
  alias: {
    '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
  },
  sourcemap: is_production
    ? {
        client: 'hidden',
        server: 'hidden',
      }
    : false,
  compatibilityDate: '2026-05-15',
  nitro: {
    externals: {
      // pg's CommonJS dependencies use extensionless subpath imports that Node ESM cannot resolve.
      external: ['pg'],
    },
    scanDirs: ['server/services'],
    experimental: {
      tasks: true,
    },
    // scheduledTasks: {},
  },
  ...(!is_production
    ? {
        eslint: {
          config: {
            stylistic: true,
          },
        },
      }
    : {}),
  i18n: {
    defaultLocale: 'fr',
    detectBrowserLanguage: false,
    differentDomains: true,
    locales: [
      {
        // Internal locale id for routing / switching
        code: 'en',
        domain: `www.${process.env.DOMAIN}`,
        file: 'en.json',
        // Real language tag for browsers/SEO ('en', 'fr', or richer like 'en-US')
        language: 'en',
        // Human-readable label in UI (e.g. language switcher)
        name: 'English',
      },
      {
        // Internal locale id for routing / switching
        code: 'fr',
        domain: `fr.${process.env.DOMAIN}`,
        file: 'fr.json',
        // Real language tag for browsers/SEO ('en', 'fr', or richer like 'en-US')
        language: 'fr',
        // Human-readable label in UI (e.g. language switcher)
        name: 'Français',
      },
    ],
    strategy: 'no_prefix',
  },
  plausible: {
    autoOutboundTracking: true,
    fileDownloads: true,
    // Prevent tracking on localhost
    ignoredHostnames: ['localhost'],
    formSubmissions: true,
    proxy: true,
  },
  // Headers only. Other nuxt-security middleware stays off until the app uses it.
  // 'unsafe-inline' in script-src is the CSP Level 2 fallback; a nonce makes browsers ignore it.
  security: {
    nonce: true,
    hidePoweredBy: true,
    sri: true,
    requestSizeLimiter: false,
    rateLimiter: false,
    xssValidator: false,
    corsHandler: false,
    allowedMethodsRestricter: false,
    csrf: false,
    removeLoggers: false,
    headers: {
      referrerPolicy: 'no-referrer',
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'DENY',
      contentSecurityPolicy: {
        'default-src': ['\'self\''],
        'script-src': [
          '\'self\'',
          '\'nonce-{{nonce}}\'',
          '\'strict-dynamic\'',
          '\'unsafe-inline\'',
        ],
        'script-src-attr': ['\'none\''],
        'frame-src': ['https://challenges.cloudflare.com'],
        'connect-src': [
          '\'self\'',
          'https://challenges.cloudflare.com',
          ...(sentry_ingest_origin ? [sentry_ingest_origin] : []),
        ],
        'style-src': ['\'self\'', '\'unsafe-inline\''],
        'img-src': ['\'self\'', 'data:'],
        'font-src': ['\'self\'', 'data:'],
        'object-src': ['\'none\''],
        'base-uri': ['\'self\''],
        'form-action': ['\'self\''],
        'frame-ancestors': ['\'none\''],
      },
    },
  },
  sentry: {
    enabled: is_sentry_enabled,
    ...(can_upload_sentry_source_maps
      ? {
          authToken: sentry_auth_token,
          org: sentry_org,
          project: sentry_project,
        }
      : {}),
    sourcemaps: {
      disable: !can_upload_sentry_source_maps,
    },
  },
  turnstile: {
    siteKey: process.env.CLOUDFLARE_TURNSTILE_PUBLIC_SITE_KEY,
  },
});
