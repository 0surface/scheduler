export function ValidateEmail(mail) {
  const res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
  console.log('res::', res)
  return res
}
