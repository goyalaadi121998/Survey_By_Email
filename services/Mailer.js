const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('goyalaadesh462@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;

// const sendgrid = require('sendgrid');
// const helper = sendgrid.mail;
// const keys = require('../config/keys');

// class Mailer extends helper.Mail {
//     constructor(survey,content) {
//         super();
        
//         this.sgApi = sendgrid(keys.sendGridAPIKey); 
//         this.from_email = new helper.Email('no-reply@emaily.com');
//         this.subject = survey.subject;
//         this.body = new helper.Content('text/html',content);
//         this.recipients = this.formatAddresses(survey.recipients);
    
//         this.addContent(this.body);
//         this.addClickTracking();
//         this.addRecipients();
//     }

//     formatAddresses(recipients) {
//         return recipients.map(({email}) => {
//             return new helper.Email(email);
//         });
//     }

//     addClickTracking() {
//         const trackingSettings = new helper.TrackingSettings();
//         const clickTracking = new helper.ClickTracking(true,true);

//         trackingSettings.setClickTracking(clickTracking);
//         this.addTrackingSettings(addTrackingSettings);
//     }

//     addRecipients() {
//         const personalize = new helper.Personalization();
//         this.recipients.forEach(recipient => {
//             personalize.addTo(recipient);
//         });
//         this.addPersonalization(personalize);
//     }

//     async send() {
//         const request = this.sgApi.emptyRequest({
//             method: 'POST',
//             path: '/v3/mail/send',
//             body: this.toJSON()
//         });
//         const response = await this.sgApi.API(request);
//         return response;
//     }
// }

// module.exports = Mailer;