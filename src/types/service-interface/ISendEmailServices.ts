export interface ISendEmailServices {
  sendEmailVerification(
    to: string,
    subject: string,
    link: string
  ): Promise<void>;

  sendForgotEmail(
    to: string,
    subject: string,
    link: string,
  ): Promise<void>;
}
