import crypto from 'crypto';

const COOKIE_NAME = 'admin-session';
const TOKEN_MAX_AGE_DAYS = 30;

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || '';
}

export function signToken(timestamp: number): string {
  const hmac = crypto.createHmac('sha256', getAdminPassword());
  hmac.update(String(timestamp));
  const signature = hmac.digest('hex');
  return `${timestamp}.${signature}`;
}

export function verifyToken(token: string): boolean {
  try {
    const [timestampStr, signature] = token.split('.');
    if (!timestampStr || !signature) return false;

    const timestamp = Number(timestampStr);
    if (isNaN(timestamp)) return false;

    // Check token age
    const ageMs = Date.now() - timestamp;
    const maxAgeMs = TOKEN_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    if (ageMs > maxAgeMs || ageMs < 0) return false;

    // Verify signature
    const expectedToken = signToken(timestamp);
    const expectedSignature = expectedToken.split('.')[1];

    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (sigBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const password = getAdminPassword();
  if (!password || !input) return false;

  const inputBuffer = Buffer.from(input);
  const passwordBuffer = Buffer.from(password);

  if (inputBuffer.length !== passwordBuffer.length) return false;
  return crypto.timingSafeEqual(inputBuffer, passwordBuffer);
}

export function isAdminFromCookies(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  return verifyToken(cookieValue);
}

export { COOKIE_NAME };

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: TOKEN_MAX_AGE_DAYS * 24 * 60 * 60,
  };
}
