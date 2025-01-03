Add-Type -AssemblyName System.Windows.Forms

function main(){
    if (-Not (Get-Command python -ErrorAction SilentlyContinue)) {
        Write-Host "Python コマンドが存在しません" -ForegroundColor Red
        [System.Windows.Forms.MessageBox]::Show("Python コマンドが存在しません", "エラー", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
        return
    }
    $pythonVersion = python -V
    if ($pythonVersion -notmatch "Python 3\.10") {
        Write-Host "Python 3.10 系がインストールされていません (中止)" -ForegroundColor Red
        [System.Windows.Forms.MessageBox]::Show("Python 3.10 系がインストールされていません (中止)", "エラー", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
        return
    }
    if (-Not (Get-Command poetry -ErrorAction SilentlyContinue)) {
        Write-Host "poetry コマンドが存在しません" -ForegroundColor Red
        [System.Windows.Forms.MessageBox]::Show("poetry コマンドが存在しません", "エラー", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
        return
    }
    poetry install
    if ($LASTEXITCODE -ne 0) {
        [System.Windows.Forms.MessageBox]::Show("poetry install に失敗しました", "エラー", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
        return
    }else{
        [System.Windows.Forms.MessageBox]::Show("インストールが完了しました", "情報", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
    }

    poetry run python MMVCServerSIO.py
}

main