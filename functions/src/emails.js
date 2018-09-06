import qs from 'qs';
import Sib from 'sendinblue-v3-node-client';

require('dotenv').config();

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST' || !event.body) callback(null, { statusCode: 403, body: 'unauthorized' });

  const fdata = qs.parse(event.body, { charset: 'utf-8' });
  const client = new Sib(process.env.SEND_IN_BLUE_API_KEY);

  client.smtp.templates
    .send(fdata[0].templateId, fdata[0].args)
    .then(
      () =>
        fdata[1]
          ? client.smtp.templates
              .send(fdata[1].templateId, fdata[1].args)
              .then(() => callback(null, { statusCode: 200, body: 'ok' }))
              .catch((err) => callback(null, { statusCode: 500, body: err }))
          : callback(null, { statusCode: 200, body: 'ok' })
    )
    .catch((err) => callback(null, { statusCode: 500, body: err }));
};
