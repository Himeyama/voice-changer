# クライアントのビルド
if (Test-Path build) {
    Remove-Item -Recurse -Force build
}
New-Item -ItemType Directory -Path build

# サーバのビルド
Set-Location server
if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
}
if (Test-Path build) {
    Remove-Item -Recurse -Force build
}
poetry run pyinstaller server.spec -y
Set-Location ..
Copy-Item -Recurse server\dist build\main
Copy-Item -Recurse .\server\i18n\ .\build\main

# クライアントのビルド
Set-Location client/demo
yarn build:prod
Set-Location ..\..
Copy-Item -Recurse client\demo\dist build\main\web_front
