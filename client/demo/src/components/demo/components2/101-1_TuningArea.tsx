import React, { useMemo } from "react";
import { useAppState } from "../../../001_provider/001_AppStateProvider";
import { useGuiState } from "../001_GuiStateProvider";
import { useTranslation } from "react-i18next";
import { Card, Label, Slider } from "@fluentui/react-components";

export type TuningAreaProps = {};

export const TuningArea = (_props: TuningAreaProps) => {
    const { serverSetting, webInfoState, webEdition } = useAppState();
    const { setBeatriceJVSSpeakerPitch, beatriceJVSSpeakerPitch } = useGuiState();
    const { t } = useTranslation();

    const selected = useMemo(() => {
        if (webEdition) {
            return webInfoState.webModelslot;
        }
        if (serverSetting.serverSetting.modelSlotIndex == undefined) {
            return;
        } else if (serverSetting.serverSetting.modelSlotIndex == "Beatrice-JVS") {
            const beatriceJVS = serverSetting.serverSetting.modelSlots.find((v) => v.slotIndex == "Beatrice-JVS");
            return beatriceJVS;
        } else {
            return serverSetting.serverSetting.modelSlots[serverSetting.serverSetting.modelSlotIndex];
        }
    }, [serverSetting.serverSetting.modelSlotIndex, serverSetting.serverSetting.modelSlots, webEdition]);

    const tuningArea = useMemo(() => {
        if (!selected) {
            return <></>;
        }
        if (selected.voiceChangerType == "MMVCv13" || selected.voiceChangerType == "MMVCv15") {
            return <></>;
        }

        // For Beatrice
        if (selected.slotIndex == "Beatrice-JVS") {
            const updateBeatriceJVSSpeakerPitch = async (pitch: number) => {
                setBeatriceJVSSpeakerPitch(pitch);
            };
            return (
                <div className="character-area-control">
                    <h3>{t('tune')}</h3>
                    <div className="slider-with-label">
                        <Slider
                            min={-2}
                            max={2}
                            step={1}
                            value={beatriceJVSSpeakerPitch}
                            onChange={(_, data) => {
                                updateBeatriceJVSSpeakerPitch(data.value);
                            }}
                        />
                        <Label className="slider-label">{beatriceJVSSpeakerPitch}</Label>
                    </div>
                </div>
            );
        }

        let currentTuning;
        if (webEdition) {
            currentTuning = webInfoState.upkey;
        } else {
            currentTuning = serverSetting.serverSetting.tran;
        }
        const tranValueUpdatedAction = async (val: number) => {
            if (webEdition) {
                webInfoState.setUpkey(val);
            } else {
                await serverSetting.updateServerSettings({ ...serverSetting.serverSetting, tran: val });
            }
        };

        return (
            <div className="character-area-control">
                <h3>{t('tune')}</h3>
                <div className="slider-with-label">
                    <Slider
                        min={-18}
                        max={18}
                        step={1}
                        defaultValue={12}
                        value={currentTuning}
                        onChange={(_, data) => {
                            tranValueUpdatedAction(data.value);
                        }}
                        style={{ width: "100%" }}
                    />
                    <Label className="slider-label">{currentTuning}</Label>
                </div>
            </div>
        );
    }, [serverSetting.serverSetting, serverSetting.updateServerSettings, selected, webEdition, webInfoState.upkey]);

    return tuningArea;
};
