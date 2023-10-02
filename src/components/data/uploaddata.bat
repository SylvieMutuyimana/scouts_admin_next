@echo off
cd json

set success_log=success.log
set error_log=error.log

REM Clear existing log files
del %success_log%
del %error_log%
cd jsonfiles
for %%f in (*.json) do (
    echo Importing %%f...

    REM Get the file extension (%%~xf) and convert it to lowercase
    set "extension=%%~xf"
    set "extension=!extension:~1,4!"
    setlocal enabledelayedexpansion
    set "extension=!extension:~0,1!"
    setlocal disabledelayedexpansion

    REM Check if the extension is "json"
    if "%extension%"=="json" (
        mongoimport --uri "mongodb+srv://RSA_Admin:HYO250-RSA_ADMIN@clusterrsa1.samuinz.mongodb.net/RSA_DATASET" --collection reports --type json --file "%%~f" >> %success_log% 2>> %error_log%
    ) else (
        echo Skipped %%f: File is not JSON.
    )
)

echo Import process completed.
pause
