import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;

export const TWITTER_PUBLISHER_HANDLE =
  publicRuntimeConfig.TWITTER_PUBLISHER_HANDLE;

export const TWITTER_AUTHOR_HANDLE = publicRuntimeConfig.TWITTER_AUTHOR_HANDLE;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;

export const TINYMC_APP_ID = publicRuntimeConfig.TINYMC_APP_ID;
