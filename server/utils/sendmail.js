const nodemailer = require("nodemailer");
const Config = require("../config/config");
module.exports = class SendMail {
  static transporter = nodemailer.createTransport(Config.EmailTransporter); 
  static mailOptions = null; 
  /* Email module
   * @method    sendEmail
   * @for       sendMail
   * @param   {String} mail 
   * @param   {String} title 
   * @param   {String} content 
   * @return {Boolean} if sent
   */
  static async sendEmail(mail, title, content) {
    this.mailOptions = {
      from: '"Email Verification" <' + Config.EmailTransporter.auth.user + ">",
      to: mail,
      subject: title,
      text: content,
    };
    try {
      let result = await this.transporter.sendMail(this.mailOptions);
      console.log("Successfully sent!");
      return true;
    } catch (error) {
      console.log(error);
      console.log("Email failed to send!");
      return false;
    }
  }
};
