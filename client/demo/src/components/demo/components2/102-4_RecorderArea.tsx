import React, { useMemo, useState } from "react";
import { useAppState } from "../../../001_provider/001_AppStateProvider";
import { useGuiState } from "../001_GuiStateProvider";
import { AUDIO_ELEMENT_FOR_SAMPLING_INPUT, AUDIO_ELEMENT_FOR_SAMPLING_OUTPUT } from "../../../const";
import { useTranslation } from "react-i18next";
import { Button, Select } from "@fluentui/react-components";

export type RecorderAreaProps = {};

export const RecorderArea = (_props: RecorderAreaProps) => {
    const { serverSetting, webEdition } = useAppState();
    const { audioOutputForAnalyzer, setAudioOutputForAnalyzer, outputAudioDeviceInfo } = useGuiState();
    const [serverIORecording, setServerIORecording] = useState<boolean>(false);

    const { t } = useTranslation();

    const serverIORecorderRow = useMemo(() => {
        if (webEdition) {
            return <> </>;
        }
        const onServerIORecordStartClicked = async () => {
            setServerIORecording(true);
            await serverSetting.updateServerSettings({ ...serverSetting.serverSetting, recordIO: 1 });
        };
        const onServerIORecordStopClicked = async () => {
            setServerIORecording(false);
            await serverSetting.updateServerSettings({ ...serverSetting.serverSetting, recordIO: 0 });
            
            const wavInput = document.getElementById(AUDIO_ELEMENT_FOR_SAMPLING_INPUT) as HTMLAudioElement;
            wavInput.src = "/tmp/in.wav?" + new Date().getTime();
            wavInput.controls = true;
            try {
                wavInput.setSinkId(audioOutputForAnalyzer);
            } catch (e) {
                console.log(e);
            }

            const wavOutput = document.getElementById(AUDIO_ELEMENT_FOR_SAMPLING_OUTPUT) as HTMLAudioElement;
            wavOutput.src = "/tmp/out.wav?" + new Date().getTime();
            wavOutput.controls = true;
            try {
                wavOutput.setSinkId(audioOutputForAnalyzer);
            } catch (e) {
                console.log(e);
            }
        };

        return (
            <>
                <h3>{t("server-io-analyzer")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto 1fr", columnGap: "8px" }}>
                    <Button onClick={onServerIORecordStartClicked}>
                        {t("start")}
                    </Button>
                    <Button onClick={onServerIORecordStopClicked}>
                        {t("stop")}
                    </Button>
                </div>

                <h3>{t('out')}</h3>
                <Select
                    className="body-select"
                    value={audioOutputForAnalyzer}
                    onChange={(_, data) => {
                        setAudioOutputForAnalyzer(data.value);
                        const wavInput = document.getElementById(AUDIO_ELEMENT_FOR_SAMPLING_INPUT) as HTMLAudioElement;
                        const wavOutput = document.getElementById(AUDIO_ELEMENT_FOR_SAMPLING_OUTPUT) as HTMLAudioElement;
                        try {
                            wavInput.setSinkId(data.value);
                            wavOutput.setSinkId(data.value);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    {outputAudioDeviceInfo
                        .map((x) => {
                            if (x.deviceId == "none") {
                                return null;
                            }
                            return (
                                <option key={x.deviceId} value={x.deviceId}>
                                    {x.label}
                                </option>
                            );
                        })
                        .filter((x) => {
                            return x != null;
                        })}
                </Select>

                <h3>{t('audio')}</h3>
                <div>
                    <audio className="config-sub-area-control-field-wav-file-audio" id={AUDIO_ELEMENT_FOR_SAMPLING_INPUT} controls></audio>
                </div>

                <h3>{t('out')}</h3>
                <div>
                    <audio className="config-sub-area-control-field-wav-file-audio" id={AUDIO_ELEMENT_FOR_SAMPLING_OUTPUT} controls></audio>
                </div>
            </>
        );
    }, [serverIORecording, audioOutputForAnalyzer, outputAudioDeviceInfo, serverSetting.updateServerSettings]);

    return <div className="config-sub-area">{serverIORecorderRow}</div>;
};
