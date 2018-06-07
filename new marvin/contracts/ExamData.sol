pragma solidity ^0.4.2;

contract ExamData {
    // servono per modificatori contratti chiamanti
    address teacherContract;
    address studentContract;
    address adminContract;

    struct Exam {
        // codice univoco exam
        bytes10 uniCode;
        // badgeNumber del professore associato
        uint32 examTeacher;
        // hash IPFS, contiene: descrizione, intervallo iscrizione, data esame, luogo esame, tipologia (orale, scritto, lab)
        bytes32 hashData;
        // badgeNumber degli studenti iscritti
        uint32[] subscribedStudents;
        // mapping degli esiti non ancora accettati, key = badgeNumber studente, value = voto (0-31)
        mapping (uint32 => bytes2) unconfirmedResults;
        // mapping degli esiti accettati, key = badgeNumber studente, value = voto (0-31)
        mapping (uint32 => bytes2) confirmedResults;
        // possibilità per lo studente di iscriversi all'esame
        bool activeSubscription;
    }
    /* mapping contenente, per ogni studente, gli esami i cui voti sono stati accettati (libretto). 
     * key = badgeNumber studente, value = array degli uniCode degli esami i cui voti sono stati accettati */
    mapping(uint32 => bytes10[]) studentExams;

    /* mapping contenente, per ogni professore, gli esami a cui è stato assegnato. 
     * key = badgeNumber professore, value = array degli uniCode degli esami a cui è stato associato */
    mapping(uint32 => bytes10[]) teacherExams;

    // codici univoci degli esami
    bytes10[] uniCodes;
    // mapping degli esami, key = uniCode
    mapping (bytes10 => Exam) exams;

    // this function should be accessible only by university or admins
    function getAllIdentifiers() public view returns(bytes10[]) {
        return uniCodes;
    }

    // get del voto confermato dello studente all'esame
    function getConfirmedResult(uint32 _studentBadgeNumber, bytes10 _examUniCode) public view returns(bytes2) {
        return(exams[_examUniCode].confirmedResults[_studentBadgeNumber]);
    }
    // get dell'hash IPFS dell'esame
    function getHashData(bytes10 _examUniCode) public view returns(bytes32) {
        return(exams[_examUniCode].hashData);
    }
    // get di tutti gli esami confermati di uno studente
    function getConfirmedExamsPerStudent(uint32 _studentBadgeNumber) public view returns(bytes10[]) {
        return(studentExams[_studentBadgeNumber]);
    }
    function getExamsPerStudentNumber(uint32 _studentBadgeNumber) public view returns(uint) {
        return(studentExams[_studentBadgeNumber].length);
    }

    // get di tutti gli studenti iscritti ad un'esame
    function getExamSubscribedStudent(bytes10 _examUniCode) public view returns(uint32[]) {
        return(exams[_examUniCode].subscribedStudents);
    }
    // get dello stato dell'esame (true = è possibile iscriversi)
    function getExamActiveSubscription(bytes10 _examUniCode) public view returns(bool) {
        return(exams[_examUniCode].activeSubscription);
    }
    // get del professore associato all'esame
    function getExamTeacher(bytes10 _examUniCode) public view returns(uint32) {
        return(exams[_examUniCode].examTeacher);
    }
    // get degli esami associati al professore
    function getTeacherExams(uint32 _teacherBadgeNumber) public view returns(bytes10[]) {
        return(teacherExams[_teacherBadgeNumber]);
    }
    // set dell'hash IPFS dell'esame 
    function setHashData(bytes10 _examUniCode, bytes32 _hashData) public {
        exams[_examUniCode].hashData = _hashData;
    }
    // set dello stato dell'esame (true = è possibile iscriversi)
    function setActiveSubscription(bytes10 _examUniCode, bool _activeSubscription) public {
        exams[_examUniCode].activeSubscription = _activeSubscription;
    }
    // ritorna true sse l'esame esiste
    function examExist(bytes10 _examUniCode) public view returns(bool) {
        if(exams[_examUniCode].uniCode != 0)
            return true;
        return false;
    }
    // ritorna true sse lo studente è iscritto all'esame
    function isStudentSubscribed(bytes10 _examUniCode, uint32 _studentBadgeNumber) public view returns(bool) {
        uint32[] memory subscribedStudent = exams[_examUniCode].subscribedStudents;
        for(uint i = 0; i < subscribedStudent.length; ++i) { 
            if(subscribedStudent[i] == _studentBadgeNumber)
                return true;
        }
        return false;
    }
    // aggiunta nuovo esame
    function addNewExam(bytes10 _examUniCode) public {
        uniCodes.push(_examUniCode);
        exams[_examUniCode].uniCode = _examUniCode;
    }
    // iscrizione dello studente all'esame
    function addNewSubscribedUser(bytes10 _examUniCode, uint32 _studentBadgeNumber) public {
        require(examExist(_examUniCode) && (getExamActiveSubscription(_examUniCode) == true));
        exams[_examUniCode].subscribedStudents.push(_studentBadgeNumber);
    }
    // set del voto dell'esame dello studente
    function setNewResult(bytes10 _examUniCode, uint32 _studentBadgeNumber, bytes2 _result) public {
        require(examExist(_examUniCode) && isStudentSubscribed(_examUniCode, _studentBadgeNumber));
        exams[_examUniCode].unconfirmedResults[_studentBadgeNumber] = _result;
    }
    // conferma del voto da parte dello studente
    function setConfirmedResult(bytes10 _examUniCode, uint32 _studentBadgeNumber) public {
        require(examExist(_examUniCode) && isStudentSubscribed(_examUniCode, _studentBadgeNumber));
        exams[_examUniCode].confirmedResults[_studentBadgeNumber] = exams[_examUniCode].unconfirmedResults[_studentBadgeNumber];
        studentExams[_studentBadgeNumber].push(_examUniCode);
    }
    // set del professore associato all'esame
    function setExamTeacher(bytes10 _examUniCode, uint32 _teacherBadgeNumber) public {
        exams[_examUniCode].examTeacher = _teacherBadgeNumber;
        teacherExams[_teacherBadgeNumber].push(_examUniCode);
    }
}