import { injectable } from "tsyringe";
import { ISendEmailServices } from "../types/service-interface/ISendEmailServices";
import nodemailer from "nodemailer";
import { config } from "../config";
import { ACCOUNT_VERIFICATION, FORGOT_PASSWORD_EMAIL } from "../shared/tamplates/email.templates";

@injectable()
export class SendEmailServices implements ISendEmailServices {
  private _transpot;

  constructor() {
    this._transpot = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.nodeMailer.EMAIL_USER,
        pass: config.nodeMailer.EMAIL_PASS,
      },
    });
    this._transpot.verify((error) => {
      if (error) {
        console.log(" Nodemailer Connection Error:", error);
      } else {
        console.log("Nodemailer Ready to Send Emails");
      }
    });
  }

  async sendEmailVerification(
    to: string,
    subject: string,
    link: string
  ): Promise<void> {
    const mailOption = {
      from: "ShelfShare",
      to,
      subject,
      html: ACCOUNT_VERIFICATION(link),
    };
    await this._transpot.sendMail(mailOption);
  }



  async sendForgotEmail(
    to: string,
    subject: string,
    link: string
  ): Promise<void> {
    const mailOption = {
      from: "ShelfShare",
      to,
      subject,
      html: FORGOT_PASSWORD_EMAIL(link),
    };
    await this._transpot.sendMail(mailOption);
  }
}
