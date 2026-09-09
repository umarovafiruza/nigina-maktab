@echo off
title 7-Maktab Local Server
cd /d "%~dp0"
echo ====================================================
echo  Bekobod 7-Maktab Localhost Server ishga tushmoqda...
echo  Manzil: http://localhost:5500
echo ====================================================

start http://localhost:5500
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 5500
pause
