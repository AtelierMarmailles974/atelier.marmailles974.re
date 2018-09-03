import { DateTime } from 'luxon';
import qs from 'qs';
import Sib from 'sendinblue-v3-node-client';

exports.handler = function(event, context, callback) {
  const fdata = qs.parse(event.body, { charset: 'utf-8' });

  const customerEmail = {
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
    sender: { email: 'no-reply@atelier.marmailles974.re' },
    subject: `SITE ATELIER MARMAILLES 974 : Accusé de Réception - BL N°${fdata.id}`,
    to: [{ email: 'gregory.bouteiller@niama.re' }],
  };

  const client = new Sib('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');

  client.smtp.transactionals
    .send(customerEmail)
    .then((data) => callback(null, { statusCode: 200, body: 'true' }))
    .catch((error) => callback(null, { statusCode: 200, body: 'false' }));
};
