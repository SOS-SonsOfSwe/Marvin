@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Vuoi veramente eliminare tutti i files che sono gitignorati? (Questa azione eliminer� tutto ci� che non � stato committato oppure pushato) (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo
git clean -xdf


:END
endlocal