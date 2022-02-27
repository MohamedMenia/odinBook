window.Buffer = window.Buffer || require("buffer").Buffer;

export function getimg(user) {
  if (user.img) {
    if (user.img.data) {
      const buffer = user.img.data.data;
      let b64 = Buffer.from(buffer).toString("base64");
      let mimeType = user.img.contentType;
      return `data:${mimeType};base64,${b64}`;
    } else return user.img;
  } else
    return "https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8";
}
