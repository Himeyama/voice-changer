import React, { useMemo } from "react";
import { useAppState } from "../../../001_provider/001_AppStateProvider";
import { useTranslation } from "react-i18next";
import { Card, Label, Slider } from "@fluentui/react-components";

export type IndexAreaProps = {};

export const IndexArea = (_props: IndexAreaProps) => {
    const { serverSetting } = useAppState();

    const selected = useMemo(() => {
        if (serverSetting.serverSetting.modelSlotIndex == undefined) {
            return;
        } else if (serverSetting.serverSetting.modelSlotIndex == "Beatrice-JVS") {
            const beatriceJVS = serverSetting.serverSetting.modelSlots.find((v) => v.slotIndex == "Beatrice-JVS");
            return beatriceJVS;
        } else {
            return serverSetting.serverSetting.modelSlots[serverSetting.serverSetting.modelSlotIndex];
        }
    }, [serverSetting.serverSetting.modelSlotIndex, serverSetting.serverSetting.modelSlots]);

    const { t } = useTranslation();

    const indexArea = useMemo(() => {
        if (!selected) {
            return <></>;
        }
        if (selected.voiceChangerType != "RVC") {
            return <></>;
        }

        const currentIndexRatio = serverSetting.serverSetting.indexRatio;
        const indexRatioValueUpdatedAction = async (val: number) => {
            await serverSetting.updateServerSettings({ ...serverSetting.serverSetting, indexRatio: val });
        };

        return (
            <div className="character-area-control">
                <h3>{t('index')}</h3>
                <div className="slider-with-label">
                    <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={1}
                        value={currentIndexRatio}
                        onChange={(_, data) => {
                            indexRatioValueUpdatedAction(data.value);
                        }}
                    />
                    <Label className="slider-label">{currentIndexRatio}</Label>
                </div>
            </div>
        );
    }, [serverSetting.serverSetting, serverSetting.updateServerSettings, selected]);

    return indexArea;
};
