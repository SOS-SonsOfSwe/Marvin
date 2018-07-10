export var academicYears = [
  { year: "2017-2018" },
  { year: "2016-2017" },
  { year: "2015-2016" },
  { year: "2014-2015" },
  { year: "2013-2014" },
]

export var degrees = [ //to be transformed into degreeData.description
  { year: "2017-2018", degreeData: "Informatica", degreeUnicode: 'INF17' },
  { year: "2017-2018", degreeData: "Matematica", degreeUnicode: 'MAT17' },
  { year: "2017-2018", degreeData: "Psicologia", degreeUnicode: 'PSI17' },
  // { year: "2017-2018", degreeData: "Ingegneria dell'energia", degreeUnicode: 'ING/ENE17' },
  // { year: "2017-2018", degreeData: "Giurisprudenza", degreeUnicode: 'GIUR17' },
  // { year: "2017-2018", degreeData: "Fisica", degreeUnicode: 'FIS17' },
  // { year: "2016-2017", degreeData: "Medicina", degreeUnicode: 'MED17' },
  // { year: "2016-2017", degreeData: "Informatica", degreeUnicode: 'MAT/INF16' },
  // { year: "2016-2017", degreeData: "Matematica", degreeUnicode: 'MAT16' },
  // { year: "2016-2017", degreeData: "Psicologia", degreeUnicode: 'PSI16' },
  // { year: "2016-2017", degreeData: "Medicina", degreeUnicode: 'MED16' },
  // { year: "2016-2017", degreeData: "Fisica", degreeUnicode: 'FIS16' }
]

export var classes = [
  { year: "2017-2018", degreeUnicode: "INF17", classData: "Reti e sicurezza", classUnicode: 'RETISICU17' },
  { year: "2017-2018", degreeUnicode: "INF17", classData: "Calcolo numerico", classUnicode: 'CALCNUME17' },
  { year: "2017-2018", degreeUnicode: "INF17", classData: "Programmazione 1", classUnicode: 'PROGR17' },
  // { year: "2017-2018", degreeUnicode: "INF17", classData: "ingegneria del software", classUnicode: 'INGESOFT17' },
  // { year: "2017-2018", degreeUnicode: "FIS17", classData: "Analisi matematica 1", classUnicode: 'ANALMAT117' },
  // { year: "2016-2017", degreeUnicode: "FIS16", classData: "Metodi matematici", classUnicode: 'METOMATE16' },
  // { year: "2016-2017", degreeUnicode: "FIS16", classData: "Fisica moderna", classUnicode: 'FISIMODE17' }
]

export var exams = [
  { classUnicode: 'PROGR17', examUnicode: 'APP1', type: 'Writing', place: 'LUF1', date: '01/01/2017', time: '14:00' },
  { classUnicode: 'PROGR17', examUnicode: 'APP2', type: 'Writing', place: 'LUF1', date: '10/01/2017', time: '14:00' },
  { classUnicode: 'PROGR17', examUnicode: 'APP3', type: 'Writing', place: 'LUF1', date: '20/07/2017', time: '14:00' },
]

export var insertUsers = [
  { FC: 'AAABBB00A00B000C', UC: '1234567890', tp: 1 },
  { FC: 'AAABBB00A00B001C', UC: '1234567880', tp: 1 },
  { FC: 'AAABBB00A00B002C', UC: '1234567870', tp: 1 },
  { FC: 'BBBCCC11B11C111D', UC: '1234567891', tp: 2 },
  { FC: 'BBBCCC11B11C112D', UC: '1234567881', tp: 2 },
  { FC: 'BBBCCC11B11C113D', UC: '1234567871', tp: 2 },
  { FC: 'CCCDDD22C22D222E', UC: '1234567892', tp: 3 },
  { FC: 'CCCDDD22C22D223E', UC: '1234567882', tp: 3 },
  { FC: 'CCCDDD22C22D224E', UC: '1234567872', tp: 3 }
]

export var signUpUsers = [
  { FC: 'AAABBB00A00B000C', UC: '1234567890', name: 'John', surname: 'Smith', email: 'john@smith.com' },
  { FC: 'AAABBB00A00B001C', UC: '1234567880', name: 'Johnny', surname: 'Reid', email: 'johnny@reid.com' },
  { FC: 'AAABBB00A00B002C', UC: '1234567870', name: 'JohnyStecchino', surname: 'Kennedy', email: 'johnnyStecchino@kennedy.com' },
  { FC: 'BBBCCC11B11C111D', UC: '1234567891', name: 'Jessica', surname: 'Rabbit', email: 'jessica@rabbit.com' },
  { FC: 'BBBCCC11B11C112D', UC: '1234567881', name: 'Marta', surname: 'Wagner', email: 'marta@wagner.com' },
  { FC: 'BBBCCC11B11C113D', UC: '1234567871', name: 'Alina', surname: 'Miles', email: 'alina@miles.com' },
  { FC: 'CCCDDD22C22D222E', UC: '1234567892', name: 'Rachel', surname: 'McAdams', email: 'rachel@mcadams.com' },
  { FC: 'CCCDDD22C22D223E', UC: '1234567882', name: 'Kate', surname: 'Hardy', email: 'kate@hardy.com' },
  { FC: 'CCCDDD22C22D224E', UC: '1234567872', name: 'Margot', surname: 'Peterson', email: 'margot@peterson.com' },
]

// await adminInstance.addUser('AAABBB00A00B000C', '1234567890', '1', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('AAABBB00A00B001C', '1234567880', '1', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('AAABBB00A00B002C', '1234567870', '1', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('BBBCCC11B11C111D', '1234567891', '2', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('BBBCCC11B11C112D', '1234567881', '2', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('BBBCCC11B11C113D', '1234567871', '2', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('CCCDDD22C22D222E', '1234567892', '3', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('CCCDDD22C22D223E', '1234567882', '3', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addUser('CCCDDD22C22D224E', '1234567872', '3', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));

// await adminInstance.addNewYear(2012, { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));

// await adminInstance.addNewYear(2013, { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// const y = '2017'
// await adminInstance.addNewYear(y, { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));

// await adminInstance.addNewDegree('INF17', y, 'asdasdasdasdasd', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addNewDegree('MAT17', y, 'asdasdasdasdasd', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addNewDegree('PSI17', y, 'asdasdasdasdasd', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));

// await userLogicInstance.signUp('AAABBB00A00B000C', '1234567890', 'asdasdasdasdasd', { from: address1 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('AAABBB00A00B001C', '1234567880', 'asdasdasdasdasd', { from: address2 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('AAABBB00A00B002C', '1234567870', 'asdasdasdasdasd', { from: address3 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('BBBCCC11B11C111D', '1234567891', 'asdasdasdasdasd', { from: address4 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('BBBCCC11B11C112D', '1234567881', 'asdasdasdasdasd', { from: address5 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('BBBCCC11B11C113D', '1234567871', 'asdasdasdasdasd', { from: address6 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('CCCDDD22C22D222E', '1234567892', 'asdasdasdasdasd', { from: address7 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('CCCDDD22C22D223E', '1234567882', 'asdasdasdasdasd', { from: address8 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await userLogicInstance.signUp('CCCDDD22C22D224E', '1234567872', 'asdasdasdasdasd', { from: address9 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));

// await adminInstance.addNewClass('INF17', 'PROGR17', 'asdasdasdasdasd', '1234567891', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addNewClass('INF17', 'ANALIS17', 'asdasdasdasdasd', '1234567891', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addNewClass('INF17', 'RETISICU17', 'asdasdasdasdasd', '1234567891', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));

// await adminInstance.addNewExam('PROGR17', 'APP1', 'asdasdasdasdasd', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addNewExam('PROGR17', 'APP2', 'asdasdasdasdasd', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));
// await adminInstance.addNewExam('PROGR17', 'APP3', 'asdasdasdasdasd', { from: address0 })
//   .then(() => console.log('Line ' + line++ + ' ok'))
//   .catch(() => console.error('Error at line ' + line++));