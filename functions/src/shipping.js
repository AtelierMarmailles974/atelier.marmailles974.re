// import { DateTime } from 'luxon';
import qs from 'qs';
import Sib from 'sendinblue-v3-node-client';

require('dotenv').config();

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST' || !event.body) callback(null, { statusCode: 200, body: 'false' });

  const fdata = qs.parse(event.body, { charset: 'utf-8' });

  const customerEmail = {
    emailTo: [fdata.email],
    templateId: 1,
  };

  /*const adminEmail = {
    htmlContent: `
    <ul>
      <li><b>Numéro de BL :</b> ${fdata.id}</li>
      <li><b>Quantité livrée :</b> ${fdata.count}</li>
      <li><b>Validé le :</b> ${DateTime.local()
        .setLocale('fr')
        .toLocaleString(DateTime.DATE_HUGE)}</li>
      <br />
      <li><b>Ecole :</b> ${fdata.school}</li>
      <li><b>Ville :</b> ${fdata.city}</li>
      <li><b>Nom :</b> ${fdata.name}</li>
      <li><b>Téléphone :</b> ${fdata.phone}</li>
      <li><b>Observations :</b> ${fdata.comments}</li>
    </ul>	
    `,
    sender: { email: 'no-reply@ateliermarmailles974.re' },
    subject: `SITE ATELIER MARMAILLES 974 : Accusé de Réception - BL N°${fdata.id}`,
    to: [{ email: 'admin@ateliermarmailles974.re' }],
  };*/

  const client = new Sib(process.env.SEND_IN_BLUE_API_KEY);

  client.smtp.templates
    .send(customerEmail)
    .then((data) => callback(null, { statusCode: 200, body: 'true' }))
    .catch((error) => callback(null, { statusCode: 200, body: 'false' }));
};
