const Class = artifacts.require('./ClassData.sol');
const Exam = artifacts.require('./ExamData.sol');
const AdminContract = artifacts.require('./Admin.sol');

const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'

AdminContract.deployed()
  .then(async (adminInstance) => {
    ClassInstance = Class.deployed()
      .then(async (ClassInstance) => {
        //Aggiunta Class
        await adminInstance.addNewClass('INF17', 'SWE', 'asdasdasdasdasd', 23, { from: address })
          .then(console.log('Insert Class OK'))
          .catch(() => console.error('Error Insert Class'));

        // Aggiunta Exams
        await adminInstance.addNewExam('SWE', 'APP1', 'asdasdasdasdasd', { from: address })
          .then(() => {
            ClassInstance.getClassExamsData('SWE')
              .then(res => console.log('Exams: ' + res))
          })
          .catch(() => console.error('Error Insert Exam1'));
        await adminInstance.addNewExam('SWE', 'APP2', 'asdasdasdasdasd', { from: address })
          .then(() => {
            ClassInstance.getClassExamsData('SWE')
              .then(res => console.log('Exams: ' + res))
          })
          .catch(() => console.error('Error Insert Exam2'));
        await adminInstance.addNewExam('SWE', 'APP3', 'asdasdasdasdasd', { from: address })
          .then(() => {
            ClassInstance.getClassExamsData('SWE')
              .then(res => console.log('Exams: ' + res))
          })
          .catch(() => console.error('Error Insert Exam3'));

        // Indici classes
        await adminInstance.getExamIndex('APP1')
          .then(res => console.log('Index Exam1: ' + res))
        await adminInstance.getExamIndex('APP2')
          .then(res => console.log('Index Exam2: ' + res))
        await adminInstance.getExamIndex('APP3')
          .then(res => console.log('Index Exam3: ' + res))

        await adminInstance.removeExam('SWE', 'APP1', { from: address })
          .then(() => {
            ClassInstance.getClassExamsData('SWE')
              .then(res => console.log('Remove Exam1: ' + res))
          })
          .catch(() => console.error('Error Remove Exam1'));

        await ClassInstance.getNumberClassExams('SWE')
          .then(res => console.log('#Exams: ' + res))

        await adminInstance.removeExam('SWE', 'APP2', { from: address })
          .then(() => {
            ClassInstance.getClassExamsData('SWE')
              .then(res => console.log('Remove Exam2: ' + res))
          })
          .catch(() => console.error('Error Remove Exam2'));

        await ClassInstance.getNumberClassExams('SWE')
          .then(res => console.log('#Exams: ' + res))

        await adminInstance.removeExam('SWE', 'APP3', { from: address })
          .then(() => {
            ClassInstance.getClassExamsData('SWE')
              .then(res => console.log('Remove Exam3: ' + res))
          })
          .catch(() => console.error('Error Remove Exam3'));

        await ClassInstance.getNumberClassExams('SWE')
          .then(res => console.log('#Exams: ' + res))
      })
  })