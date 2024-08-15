export function removeDomainFromEmail(email) {
  return email.replace(/@.*$/, '');
}
