import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'ja',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    "F0 Det.": "F0 Det.",
                    "S.Thresh.": "S.Thresh.",
                    "noise": "Noise",
                    "Echo": "Echo",
                    "Sup1": "Sup1",
                    "Sup2": "Sup2",
                    "GPU(dml)": "GPU(dml)",
                    "more info": "more info",
                    "GPU": "GPU",
                    "EXTRA": "EXTRA",
                    "CHUNK": "CHUNK",
                    "GAIN": "GAIN",
                    "start": "start",
                    "stop": "stop",
                    "passthru": "passthru",
                    "in": "in",
                    "out": "out",
                    "audio": "audio",
                    "client": "client",
                    "server": "server",
                    "reload": "reload",
                    "monitor": "monitor",
                    "select-model": "Select a model",
                    "clear-settings": "Clear settings",
                    "save-settings": "Save settings",
                    "tune": "Tune",
                    "index": "Index",
                    "voice": "Voice",
                    "gain": "Gain",
                    "record": "Record",
                    "start-record": "Start recording",
                    "stop-record": "Stop recording",
                    "server-io-analyzer": "ServerIO Analyzer",
                    "more...": "more...",
                    "merge-lab": "Merge Lab",
                    "advanced-setting": "Advanced Setting",
                    "server-info": "Server Info",
                    "client-info": "Client Info",
                    "S.R.": "Sampling Rate",
                }                
            },
            ja: {
                translation: {
                    "F0 Det.": "F0 検出",
                    "S.Thresh.": "無音閾値",
                    "noise": "ノイズ",
                    "Echo": "エコー",
                    "Sup1": "ノイズ抑制1",
                    "Sup2": "ノイズ抑制2",
                    "GPU(dml)": "GPU(dml)",
                    "more info": "詳細",
                    "GPU": "GPU",
                    "EXTRA": "エクストラ",
                    "CHUNK": "チャンク",
                    "GAIN": "ゲイン",
                    "start": "開始",
                    "stop": "停止",
                    "passthru": "パススルー",
                    "in": "入力",
                    "out": "出力",
                    "audio": "オーディオ",
                    "client": "クライアント",
                    "server": "サーバ",
                    "reload": "再読込",
                    "monitor": "モニタ",
                    "select-model": "モデル選択",
                    "clear-settings": "設定の初期化",
                    "save-settings": "設定の保存",
                    "tune": "ピッチ",
                    "index": "インデックス",
                    "voice": "ボイス",
                    "gain": "利得",
                    "record": "録音",
                    "start-record": "録音開始",
                    "stop-record": "録音停止",
                    "server-io-analyzer": "サーバ入出力テスト",
                    "more...": "その他...",
                    "merge-lab": "モデルマージ",
                    "advanced-setting": "詳細設定",
                    "server-info": "サーバ情報",
                    "client-info": "クライアント情報",
                    "S.R.": "サンプリング周波数",
                }                
            }
        }
    });

export default i18n;
