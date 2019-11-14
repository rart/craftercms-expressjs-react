
let iceRepaintTimeout;

export const CRAFTER_BASE = 'http://authoring.sample.com:8080';
export const STATIC_ASSETS_BASE = CRAFTER_BASE;
export const STUDIO_BASE = `${CRAFTER_BASE}/studio`;
export const STUDIO_STATIC_ASSETS = `${STUDIO_BASE}/static-assets`;
export const GRAPHQL_URL = `${CRAFTER_BASE}/api/1/site/graphql?crafterSite=headless-ssr-store`;

export function doICERepaint() {
  clearTimeout(iceRepaintTimeout);
  iceRepaintTimeout = setTimeout(
    () => {
      window.amplify &&
      window.amplify.publish('INIT_ICE_REGIONS');
    },
    100
  );
}

export function enableICE() {
  const id = 'crafterCMSOverlayhook';
  if (document.getElementById(id) === null) {

    const script = document.createElement('script');

    script.id = id;
    script.src = `${STUDIO_STATIC_ASSETS}/libs/requirejs/require.js`;
    script.setAttribute('data-main', `${STUDIO_BASE}/overlayhook?`);

    document.head.appendChild(script);

  }
}

export function useICE({ modelId, label = '' }) {
  return {
    props: {
      'data-studio-ice': '',
      'data-studio-ice-path': modelId,
      'data-studio-ice-label': label
    }
  };
}
