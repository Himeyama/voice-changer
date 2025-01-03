import React, { useMemo } from "react";
import { useAppState } from "../../../001_provider/001_AppStateProvider";
import { F0Detector } from "@dannadori/voice-changer-client-js";
import { useAppRoot } from "../../../001_provider/001_AppRootProvider";
import { useTranslation } from "react-i18next";
// import { Checkbox } from "@fluentui/react";
import { Card, Checkbox, Label, Select, Slider } from "@fluentui/react-components";

export type QualityAreaProps = {
    detectors: string[];
};

export const QualityArea = (props: QualityAreaProps) => {
    const { setVoiceChangerClientSetting, serverSetting, setting, webEdition } = useAppState();
    const { appGuiSettingState } = useAppRoot();
    const { t } = useTranslation();
    const edition: string = appGuiSettingState.edition;

    const qualityArea = useMemo(() => {
        if (!serverSetting.updateServerSettings || !setVoiceChangerClientSetting || !serverSetting.serverSetting || !setting) {
            return <></>;
        }

        const generateF0DetOptions = () => {
            if (edition.indexOf("onnxdirectML-cuda") >= 0) {
                const recommended = ["crepe_tiny", "rmvpe_onnx"];
                return Object.values(props.detectors).map((x) => {
                    if (recommended.includes(x)) {
                        return (
                            <option key={x} value={x}>
                                {x}
                            </option>
                        );
                    } else {
                        return (
                            <option key={x} value={x} disabled>
                                {x}(N/A)
                            </option>
                        );
                    }
                });
            } else {
                return Object.values(props.detectors).map((x) => {
                    return (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    );
                });
            }
        };
        const f0DetOptions = generateF0DetOptions();

        const f0Det = webEdition ? (
            <></>
        ) : (
            <div className="config-sub-area-control">
                <h3>{t('F0 Det.')}</h3>
                <div className="config-sub-area-control-field">
                    <Select
                        className="body-select"
                        value={serverSetting.serverSetting.f0Detector}
                        onChange={(e) => {
                            serverSetting.updateServerSettings({ ...serverSetting.serverSetting, f0Detector: e.target.value as F0Detector });
                        }}
                    >
                        {f0DetOptions}
                    </Select>
                </div>
            </div>
        );

        const threshold = webEdition ? (
            <></>
        ) : (
            // <div>
            //     <h3>{t('S.Thresh.')}</h3>
            //     <Slider
            //         min={0.00000}
            //         max={0.001}
            //         step={0.0001}
            //         style={{ width: "100%" }}
            //         value={serverSetting.serverSetting.silentThreshold || 0.0}
            //         onChange={(_, data) => {
            //             serverSetting.updateServerSettings({ ...serverSetting.serverSetting, silentThreshold: data.value });
            //         }}
            //     />
            // </div>
            <div>
                <h3>{t('S.Thresh.')}</h3>
                <div className="slider-with-label" style={{gridTemplateColumns: "1fr 64px"}}>
                    <Slider
                        min={0.00000}
                        max={0.001}
                        step={0.00005}
                        defaultValue={1}
                        value={serverSetting.serverSetting.silentThreshold || 0.0}
                        onChange={(_, data) => {
                            serverSetting.updateServerSettings({ ...serverSetting.serverSetting, silentThreshold: data.value });
                        }}
                    />
                    <Label className="slider-label">{serverSetting.serverSetting.silentThreshold || 0.0}</Label>
                </div>
            </div>
        );

        return (
            <div className="config-sub-area">
                <div className="config-sub-area-control">
                    <h3>{t('noise')}</h3>
                    <div className="config-sub-area-control-field">
                        <div className="config-sub-area-noise-container">
                            <div className="config-sub-area-noise-checkbox-container">
                                <Checkbox label={t('Echo')} onChange={(e) => {
                                    try {
                                        setVoiceChangerClientSetting({ ...setting.voiceChangerClientSetting, echoCancel: e.target.checked });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }} disabled={serverSetting.serverSetting.enableServerAudio != 0} checked={setting.voiceChangerClientSetting.echoCancel} />
                            </div>
                            <div className="config-sub-area-noise-checkbox-container">
                                <Checkbox label={t('Sup1')} onChange={(e) => {
                                    try {
                                        setVoiceChangerClientSetting({ ...setting.voiceChangerClientSetting, noiseSuppression: e.target.checked });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }} disabled={serverSetting.serverSetting.enableServerAudio != 0} checked={setting.voiceChangerClientSetting.noiseSuppression} />
                            </div>
                            <div className="config-sub-area-noise-checkbox-container">
                                <Checkbox disabled={serverSetting.serverSetting.enableServerAudio != 0}
                                    checked={setting.voiceChangerClientSetting.noiseSuppression2}
                                    onChange={(e) => {
                                        try {
                                            setVoiceChangerClientSetting({ ...setting.voiceChangerClientSetting, noiseSuppression2: e.target.checked });
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }}
                                    label={t('Sup2')} />
                            </div>
                        </div>
                    </div>
                </div>
                {f0Det}
                {threshold}
            </div>
        );
    }, [serverSetting.serverSetting, setting, serverSetting.updateServerSettings, setVoiceChangerClientSetting]);

    return qualityArea;
};
