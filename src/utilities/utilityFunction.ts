
/**  @description: this javascript file contain generic functions.
 *  @Init_date:  16/06/2025
 *  @last_modify_date: 16/06/2025
 *  @last_Modify_By:  styves daudet
 */

import axios from "axios";

/** this function is used to send Email , param are sender, receiver, subject, message */
export function sendGriotEmail(receiverEmail:any, subject:any, message:any) {
  const emailData = {
    to: receiverEmail,
    subject: subject,
    text: message,
  };
  const url = import.meta.env.VITE_APP_MESSAGE_DOMAIN + "/send-email";

  axios
    .post(url, emailData)
    .then((response) => {
      console.log("Email sent successfully:", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

/** this function is used to send Email async , param are sender, receiver, subject, message */
export async function asyncSendGriotEmail(receiverEmail:any, subject:any, message:any) {
  const emailData = {
    to: receiverEmail,
    subject: subject,
    text: message,
  };
  const url = import.meta.env.VITE_APP_MESSAGE_DOMAIN + "/send-email";

  axios
    .post(url, emailData)
    .then((response) => {
      console.log("Email sent successfully:", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
