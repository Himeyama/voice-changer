# クライアントのビルド
if (Test-Path build) {
    Remove-Item -Recurse -Force build
}
New-Item -ItemType Directory -Path build

# クライアントのビルド
Set-Location client/demo
yarn build:prod
Set-Location ..\..
Copy-Item -Recurse client\demo\dist build\client\demo\dist

# サーバのビルド
New-Item -ItemType Directory -Path build\server
New-Item -ItemType Directory -Path build\server\tmp_dir
Copy-Item -Recurse server\data build\server
Copy-Item -Recurse server\i18n build\server
Copy-Item -Recurse server\*.py build\server
Copy-Item -Recurse server\downloader build\server
Copy-Item -Recurse server\model_dir_static build\server
Copy-Item -Recurse server\mods build\server
Copy-Item -Recurse server\restapi build\server
Copy-Item -Recurse server\sio build\server
Copy-Item -Recurse server\voice_changer build\server
Copy-Item -Recurse server\poetry.lock build\server
Copy-Item -Recurse server\.python-version build\server
Copy-Item -Recurse server\pyproject.toml build\server

Copy-Item -Recurse start.ps1 build\server
Copy-Item -Recurse icon.ico build