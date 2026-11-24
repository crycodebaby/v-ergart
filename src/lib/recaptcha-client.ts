"use client";

type RecaptchaClient = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaClient;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
let readyClient: Promise<RecaptchaClient> | undefined;

async function withTimeout<T>(operation: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("reCAPTCHA timeout")), timeoutMs);
    });
    return await Promise.race([operation, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

function loadRecaptcha(siteKey: string): Promise<RecaptchaClient> {
  if (readyClient) return readyClient;

  const script = document.createElement("script");
  script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
  script.async = true;

  const loaded = new Promise<RecaptchaClient>((resolve, reject) => {
    script.onload = () => {
      const client = window.grecaptcha;
      if (!client) {
        reject(new Error("reCAPTCHA API unavailable"));
        return;
      }
      client.ready(() => resolve(client));
    };
    script.onerror = () => reject(new Error("reCAPTCHA script unavailable"));
  });

  readyClient = withTimeout(loaded, 6_000).catch((error) => {
    script.remove();
    readyClient = undefined;
    throw error;
  });
  document.head.appendChild(script);
  return readyClient;
}

/** Wird beim Absenden aufgerufen, nachdem die reCAPTCHA-Einwilligung geprüft wurde. */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;

  try {
    const client = await loadRecaptcha(SITE_KEY);
    return await withTimeout(client.execute(SITE_KEY, { action }), 6_000);
  } catch {
    return null;
  }
}
