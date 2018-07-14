export function checkFiscalCode(fC) {
  let reg = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;
  let fiscalCode = fC.match(new RegExp(reg));
  if (fiscalCode != null)
    return true;
  return false;
}

export function checkMail(mail) {
  let reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let check = mail.match(new RegExp(reg));
  if (check != null)
    return true;
  return false;
}

export function checkUniqueCode(UC) {
  let check = UC.match(new RegExp('^[0-9]+$'));
  if (check != null)
    return true;
  return false;
}

export function userDef(type) {
  switch (type) {
    case 3:
      return 'student';
    case 2:
      return 'teacher';
    case 1:
      return 'administrator';
    case 4:
      return 'super admin';
    default:
      return 'undefined';
  }
}

export function web3HexToInt(hex) {
  hex.toString()
  console.log('hex.toString(): ' + hex)
  var zeros = 0;
  for (let i = hex.length; i > 0; i--) {
    if (hex[i - 1] === '0') zeros--
    else break
  }
  return parseInt(hex.slice(2, zeros), 16)
}

export function checkY(year) {
  let check = year.match(new RegExp('^2[0-9][0-9][0-9]-2[0-9][0-9][0-9]$'));
  if (check === null){
    return "Incorrect format";
  }
  if(new Date().getFullYear() > parseInt( year.slice(0,4), 10))
    return "Year before the current one";
  return true;
}
 
export function checkDegreeUnicode(code){
  let check = code.match(new RegExp('^[A-Z]{4}[0-9][0-9]$'))
  if(check!== null)
    return true;
  else
    return false;
}

export function checkExam(state){
  if

}