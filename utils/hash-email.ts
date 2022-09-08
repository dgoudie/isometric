import { createHash } from 'crypto';

export default function hashEmail(email: string) {
  return createHash('sha256').update(email).digest('hex');
}
