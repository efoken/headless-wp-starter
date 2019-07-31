import { Service } from 'axios-middleware';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import axios from 'restyped-axios';
import Config from '../../config';
import { WooCommerceAPI } from '../types/WooCommerceAPI';

const consumerKey = 'ck_3556e85abe6af9118bbecd1642fc8c550d0fefc1';
const consumerSecret = 'cs_efb4b9aa659d82dc4012203f258e3f9c5da5b70c';

const wc = axios.create<WooCommerceAPI>({
  baseURL: `${Config.apiUrl}/wc/v3`,
  headers: {
    accept: 'application/json',
  },
});

const service = new Service(wc);

service.register({
  onRequest: (config: any) => ({
    ...config,
    ...(/^https/i.test(config.url)
      ? {
          auth: {
            username: consumerKey,
            password: consumerSecret,
          },
        }
      : {
          params: {
            ...config.params,
            ...new OAuth({
              consumer: {
                key: consumerKey,
                secret: consumerSecret,
              },
              signature_method: 'HMAC-SHA256',
              hash_function: (baseString, key) => {
                return crypto
                  .createHmac('sha256', key)
                  .update(baseString)
                  .digest('base64');
              },
            }).authorize({
              url: config.url,
              method: config.method.toUpperCase(),
            }),
          },
        }),
  }),
});

export default wc;
