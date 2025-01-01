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
                }                
            }
        }
    });

export default i18n;
