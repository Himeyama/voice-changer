$appName = "voice-changer"
$execFile = "server\start.ps1"
$desktopAppName = "VCClient"
$publisher = "ひかり"
$version = (Get-Date).ToString("yy.M.d")
$date = (Get-Date).ToString("yyyyMMdd")
$publishDir = "build"
$icon = "icon.ico"
$serverDir = "server"
$size = [Math]::Round((Get-ChildItem $publishDir -Force -Recurse -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1KB, 0, [MidpointRounding]::AwayFromZero)

.'C:\Program Files (x86)\NSIS\makensis.exe' `
    /DVERSION="$version" `
    /DDATE="$date" `
    /DSIZE="$size" `
    /DMUI_ICON="$icon" `
    /DMUI_UNICON="$icon" `
    /DPUBLISH_DIR="$publishDir" `
    /DPRODUCT_NAME="$appName" `
    /DPUBLISHER="$publisher" `
    /DDESKTOP_APP_NAME="$desktopAppName" `
    /DEXEC_FILE="$execFile" `
    /DSERVER_DIR="$serverDir" `
    setup.nsi