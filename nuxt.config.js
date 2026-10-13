'use strict';

import {
  fileURLToPath,
} from 'node:url';

import remarkHeadingId from './shared/markdown/remark-heading-id.js';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/plausible',
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
    public: {
      domain: process.env.DOMAIN,
    },
  },
  alias: {
    '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
  },
  compatibilityDate: '2026-05-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    differentDomains: true,
    locales: [
      {
        code: 'en',
        domain: `www.${process.env.DOMAIN}`,
        file: 'en.json',
        language: 'en',
        name: 'English',
      },
      {
        code: 'fr',
        domain: `fr.${process.env.DOMAIN}`,
        file: 'fr.json',
        language: 'fr',
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
});
