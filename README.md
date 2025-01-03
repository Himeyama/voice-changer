# VCClient designed with Fluent UI
Fluent UI でクライアントの UI を再設計した VCClient の改変版です。

Windows 11 で使用を確認しています。

![](docs/screenshot00.png)

このプロジェクトは、https://github.com/w-okada/voice-changer をフォークしたもので、MITライセンスに従っています。

## 別途ソフトウェアの動作に必要なもの (依存ソフトウェア)
Windows 版をインストールしてください。

### NVIDIA CUDA Toolkit 12.4
以下より、Windows (x86_64、11、exe) 版をダウンロードし、インストールしてください。

https://developer.nvidia.com/cuda-12-4-0-download-archive

### Python (Pyenv) 3.10
以下を参照し、インストールしてください。

https://github.com/pyenv-win/pyenv-win?tab=readme-ov-file#quick-start

```ps1
pyenv install 3.10
pyenv global 3.10
```

### Poetry
```ps1
pip install poetry
```


## 利用規約
リアルタイムボイスチェンジャーの利用に関しては、各モデルおよび各キャラクターの規約に従ってください。

## 免責事項
本ソフトウェアの使用または使用不能により生じたあらゆる直接損害・間接損害・波及的損害・結果的損害または特別損害について、一切の責任を負いません。