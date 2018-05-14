export function checkFiscalCode(fC) {
    let reg = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;
    let fiscalCode = fC.match(new RegExp(reg));
    if( fiscalCode != null )
        return true;
    return false;
}

export function checkMail(mail) {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let check = mail.match(new RegExp(reg));
    if( check != null )
        return true;
    return false;
}

export function checkUniqueCode(UC) {
    let check = UC.match(new RegExp('^[0-9]+$'));
    if(check != null)
        return true;
    return false;
}

export function userDef(type) {
    switch(type) {
    case 2:
        return 'student';
    case 1:
        return 'professor';
    case 0:
        return 'administrator';
    case 4: 
        return 'super admin';
    default:
        return 'undefined';
    }
}
