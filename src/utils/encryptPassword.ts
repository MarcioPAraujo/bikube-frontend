export const encryptPassword = async (password: string): Promise<string> => {
  const key = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
  if (!key) {
    throw new Error('Encryption key is not defined');
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const passwordData = encoder.encode(password);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    cryptoKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    derivedKey,
    passwordData,
  );

  const combinedBuffer = new Uint8Array(
    salt.byteLength + iv.byteLength + encryptedData.byteLength,
  );
  combinedBuffer.set(salt, 0);
  combinedBuffer.set(iv, salt.byteLength);
  combinedBuffer.set(
    new Uint8Array(encryptedData),
    salt.byteLength + iv.byteLength,
  );

  return Array.from(combinedBuffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const decryptPassword = async (
  encryptedHex: string,
): Promise<string> => {
  const key = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
  if (!key) {
    throw new Error('Encryption key is not defined');
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const matches = encryptedHex.match(/.{1,2}/g);
  if (!matches) {
    throw new Error('Invalid encrypted hex string');
  }
  const encryptedData = new Uint8Array(matches.map(byte => parseInt(byte, 16)));

  const salt = encryptedData.slice(0, 16);
  const iv = encryptedData.slice(16, 28);
  const data = encryptedData.slice(28);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );
  const derivedKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    cryptoKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    derivedKey,
    data,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
};
