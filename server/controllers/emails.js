import sg, { mail as helper } from 'sendgrid';
import User from '../models/user';

import * as ItemController from './items';
import { REVIEW_SESSION_SIZE } from './sessions';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const domain = process.env.HOST_URL;
const sourceEmail = new helper.Email('hello@pensieve.space', 'Pensieve');

const template = (name, items) => {
  const url = `${domain}/sessions/new`;
  const buttonStyle =
    'background-color:#2e78ba;border-radius:3px;color:#ffffff;line-height:30px;height:30px;text-align:center;text-decoration:none;width:100px;';

  return `<div style='color:#000000;'>
  <p>You have <span style='font-weight:bold;'>${items.length} items</span> that need review. Review them now before you forget.</p>

  <div style='${buttonStyle}'>
  <a href='${url}' style='color:#ffffff;text-decoration:none;'>Review Now</a>
  </div>

  <p>Anyways that was fun. See you later!</p>

  <p>Your friend,</p>
  <p>Pensieve</p>
  </div>`;
};

const constructEmailRequest = (targetName, targetEmail, items) => {
  const subject = 'You have notes to review - Pensieve';
  const content = new helper.Content('text/html', template(targetName, items));
  const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
  return sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
};

export const broadcastEmailToUser = user => {
  ItemController.getDueItemsHelper(user.id)
    .then(items => {
      if (items.length >= REVIEW_SESSION_SIZE) {
        // Only send email if items less than review size.
        sendEmail(user, items);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const broadcastEmailsToAll = () => {
  User.find({ is_email_on: true })
    .then(users => {
      users.forEach(user => {
        broadcastEmailToUser(user);
      });
    })
    .catch(error => {
      return console.log(error);
    });
};

export const sendEmail = (user, items) => {
  console.log(`Attempting email to ${user.email}...`);
  const request = constructEmailRequest(user.name, user.email, items);

  return sendgrid
    .API(request)
    .then(response => {
      console.log('Email Success - Status Code:', response.statusCode);
    })
    .catch(error => {
      console.log('Emailer Error', error.response.statusCode, error.response);
    });
};

/* Id of sendgrid list for prelaunch emails */
const PRELAUNCH_LIST_ID = 1769636;

export const addEmailToPrelaunchList = (req, res) => {
  const email = req.body.email;

  // Step 1. Create SG recipient object
  const createRecipientRequest = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/contactdb/recipients',
    body: [{ email: email }]
  });

  return sendgrid
    .API(createRecipientRequest)
    .then(response => {
      const { persisted_recipients } = response.body;

      // Step 2. Add SG recipient id to prelaunch list
      const addToListRequest = sendgrid.emptyRequest({
        method: 'POST',
        path: `/v3/contactdb/lists/${PRELAUNCH_LIST_ID}/recipients`,
        body: persisted_recipients
      });
      return sendgrid.API(addToListRequest);
    })
    .then(response => {
      return res.status(response.statusCode).json({ message: 'Success!' });
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};
