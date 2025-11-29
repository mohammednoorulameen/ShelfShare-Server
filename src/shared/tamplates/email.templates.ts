
// export const ACCOUNT_VERIFICATION = (verificationLink: string) => {
//   return `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <style>
//       .container {
//         max-width: 500px;
//         margin: auto;
//         padding: 25px;
//         background: #ffffff;
//         border-radius: 10px;
//         font-family: Arial, sans-serif;
//         border: 1px solid #eee;
//       }
//       .title {
//         font-size: 22px;
//         font-weight: bold;
//         color: #333;
//         margin-bottom: 10px;
//         text-align: center;
//       }
//       .logo {
//         text-align: center;
//         margin-bottom: 20px;
//       }
//       .btn {
//         display: block;
//         width: 100%;
//         padding: 12px;
//         background: #4f46e5;
//         color: white;
//         text-align: center;
//         border-radius: 6px;
//         text-decoration: none;
//         font-size: 16px;
//         font-weight: bold;
//         margin-top: 25px;
//       }
//       .footer {
//         margin-top: 25px;
//         font-size: 12px;
//         color: #777;
//         text-align: center;
//       }
//     </style>
//   </head>
//   <body>

//   <div class="container">
//     <div class="logo">
//       <img src="https://i.imgur.com/HEPj8Db.png" width="150"/>
//     </div>

//     <div class="title">Verify Your Email – ShelfShare</div>

//     <p>Hello 👋,</p>

//     <p>
//       Thank you for signing up! Please click the button below to verify your email address
//       and activate your account.
//     </p>

//     <a href="${verificationLink}" class="btn">Verify Email</a>

//     <p class="footer">
//       If you didn't create this account, please ignore this email.
//     </p>
//   </div>

//   </body>
//   </html>
//   `;
// };

export const ACCOUNT_VERIFICATION = (verificationLink: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
      body {
        background: #f5f5f5;
        font-family: Arial, sans-serif;
        padding: 30px 0;
      }

      .container {
        max-width: 500px;
        margin: auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .title {
        font-size: 24px;
        font-weight: bold;
        color: #111827;
        text-align: center;
        margin-bottom: 15px;
      }

      .message {
        font-size: 15px;
        color: #374151;
        line-height: 1.6;
      }

      .btn {
        display: block;
        width: 100%;
        margin-top: 25px;
        background: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        padding: 14px;
        text-align: center;
        font-size: 16px;
        border-radius: 8px;
        font-weight: bold;
      }

      .footer {
        margin-top: 25px;
        font-size: 12px;
        text-align: center;
        color: #6b7280;
        line-height: 1.4;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="logo">
        <img src="https://i.imgur.com/HEPj8Db.png" width="150" alt="ShelfShare Logo" />
      </div>

      <div class="title">Verify Your Email</div>

      <p class="message">
        Hello 👋,<br><br>
        Thank you for registering on <strong>ShelfShare</strong>.<br>
        Please verify your email address to activate your account.
      </p>

      <a href="${verificationLink}" class="btn">Verify Email</a>

      <p class="footer">
        If you did not create this account, you can safely ignore this email.<br>
        This link will expire shortly for security reasons.
      </p>
    </div>
  </body>
  </html>
  `;
};


export const FORGOT_PASSWORD_EMAIL = (resetLink: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
      body {
        background: #f5f5f5;
        font-family: Arial, sans-serif;
        padding: 30px 0;
      }

      .container {
        max-width: 500px;
        margin: auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
      }

      .title {
        font-size: 24px;
        font-weight: bold;
        color: #111827;
        text-align: center;
        margin-bottom: 15px;
      }

      .message {
        font-size: 15px;
        color: #374151;
        line-height: 1.6;
      }

      .btn {
        display: block;
        width: 100%;
        margin-top: 25px;
        background: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        padding: 14px;
        text-align: center;
        font-size: 16px;
        border-radius: 8px;
        font-weight: bold;
      }

      .footer {
        margin-top: 25px;
        font-size: 12px;
        text-align: center;
        color: #6b7280;
        line-height: 1.4;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="logo">
        <img src="https://i.imgur.com/HEPj8Db.png" width="150" alt="ShelfShare Logo" />
      </div>

      <div class="title">Reset Your Password</div>

      <p class="message">
        Hello 👋,<br><br>
        We received a request to reset your password for <strong>ShelfShare</strong>.<br>
        Click the button below to create a new password.
      </p>

      <a href="${resetLink}" class="btn">Reset Password</a>

      <p class="footer">
        If you did not request this, please ignore this email.<br>
        For security reasons, this link will expire soon.
      </p>
    </div>
  </body>
  </html>
  `;
};
