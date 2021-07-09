@echo off
setlocal EnableExtensions DisableDelayedExpansion
cls
color 02
title ezlaunch
set version=0.0.1.2
echo.
echo.
echo        ******************************************************
echo        * Neko's one touch streaming button to make life easy*
echo        *                                                    *
echo        * Ver: %version%                                       *
echo        ******************************************************
echo.
timeout 3
cls


title ezlaunch Step 1: OBS Studio
color 05
echo.
echo.
echo        ******************************************************
echo        * Neko's one touch streaming button to make life easy*
echo        *                                                    *
echo        * Step 2: Starting OBS Studio.                       *
echo        ******************************************************
echo.
pushd E:\Programme\obs-studio\bin\64bit
start obs64.exe
popd
timeout 5
cls


title ezlaunch Step 2: StreamLabels
echo.
echo.
echo        ******************************************************
echo        * Neko's one touch streaming button to make life easy*
echo        *                                                    *
echo        * Step 1: Starting StreamLabels.                     *
echo        ******************************************************
echo.
pushd C:\Users\Rene0\AppData\Local\Programs\streamlabels
start StreamLabels.exe
popd
timeout 3
cls

title ezlaunch Step 3: Neko's Personal Slave
color 0b
echo.
echo.
echo        ******************************************************
echo        * Neko's one touch streaming button to make life easy*
echo        *                                                    *
echo        * Step 3: Starting Slave Bot.                        *
echo        ******************************************************
echo.

node bot.js
cls

echo bai bai
echo.
timeout 20