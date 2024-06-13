import CryptoJS from 'crypto-js';

const Codechallenge = codeVerifier => {
  const hashed = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
  const base64urlEncoded = base64urlencode(hashed);
  return base64urlEncoded;
};

const base64urlencode = str => {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/[=]/g, '');
};

export default Codechallenge;
