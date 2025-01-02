# クライアントのビルド
if (Test-Path build) {
    Remove-Item -Recurse -Force build
}
New-Item -ItemType Directory -Path build
Set-Location client/demo
yarn build:prod
Set-Location ..\..
Copy-Item -Recurse client\demo\dist build\client
