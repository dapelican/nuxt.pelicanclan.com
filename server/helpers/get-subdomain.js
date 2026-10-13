'use strict';

import { getRequestURL } from 'h3';

/**
 * Determines the language from the request subdomain.
 * @param {object} event - The H3 event object from the incoming request.
 * @returns {'www' | 'fr'} 'www' when subdomain is 'www', 'fr' when subdomain is 'fr'.
 */
const getSubdomain = (event) => {
  const url = getRequestURL(event);

  const hostname = url?.hostname ?? '';

  const subdomain = hostname.split('.').at(0) ?? '';

  if (subdomain === 'localhost') {
    return 'www';
  }

  return subdomain;
};

export {
  getSubdomain,
};
