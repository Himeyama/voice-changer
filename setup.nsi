!define INSTALL_DIR "$LOCALAPPDATA\${PRODUCT_NAME}"
!define INSTALL_ICON_PATH "$LOCALAPPDATA\${MUI_ICON}"

# Modern UI
!include MUI2.nsh
# nsDialogs
!include nsDialogs.nsh
# LogicLib
!include LogicLib.nsh

# アプリケーション名
Name "${DESKTOP_APP_NAME}"

BrandingText "${PRODUCT_NAME} v${VERSION}"

# 作成されるインストーラ
OutFile "Install.exe"

# インストールされるディレクトリ
InstallDir "${INSTALL_DIR}"

# アイコン
Icon "${MUI_ICON}"
UninstallIcon "${MUI_UNICON}"

# ページ
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE LICENSE
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH

!insertmacro MUI_LANGUAGE "Japanese"

# デフォルト セクション
Section
    # 出力先を指定します。
    SetOutPath "$INSTDIR"

    # 古いファイルの削除
    RMDir /r "$INSTDIR"

    # インストールされるファイル
    File /r "${PUBLISH_DIR}\*.*"
    File "${MUI_ICON}"

    # アンインストーラを出力
    WriteUninstaller "$INSTDIR\Uninstall.exe"

    # スタート メニューにショートカットを登録
    CreateDirectory "$SMPROGRAMS\${DESKTOP_APP_NAME}"
    SetOutPath "$INSTDIR\${SERVER_DIR}"
    CreateShortcut "$SMPROGRAMS\${DESKTOP_APP_NAME}\${DESKTOP_APP_NAME}.lnk" "powershell" "$INSTDIR\${EXEC_FILE}" "$INSTDIR\icon.ico"

    # デスクトップにショートカットを登録
    CreateShortcut "$DESKTOP\${DESKTOP_APP_NAME}.lnk" "powershell" "$INSTDIR\${EXEC_FILE}" "$INSTDIR\icon.ico"

    # レジストリに登録
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "DisplayName" "${DESKTOP_APP_NAME}"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "UninstallString" '"$INSTDIR\Uninstall.exe"'
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "Publisher" "${PUBLISHER}"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "DisplayIcon" "$INSTDIR\icon.ico"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "DisplayVersion" "${VERSION}"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "InstallDate" "${DATE}"
    WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}" "EstimatedSize" "${SIZE}"
SectionEnd

# アンインストーラ
Section "Uninstall"
    # アンインストーラを削除
    Delete "$INSTDIR\Uninstall.exe"

    # ファイルを削除
    Delete "$INSTDIR\${EXEC_FILE}"

    # ディレクトリを削除
    RMDir /r "$INSTDIR"

    # スタート メニューから削除
    Delete "$SMPROGRAMS\${PRODUCT_NAME}\${PRODUCT_NAME}.lnk"
    RMDir "$SMPROGRAMS\${PRODUCT_NAME}"

    # デスクトップからショートカットを削除
    Delete "$DESKTOP\${DESKTOP_APP_NAME}.lnk"

    # レジストリ キーを削除
    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"
SectionEnd

RequestExecutionLevel user