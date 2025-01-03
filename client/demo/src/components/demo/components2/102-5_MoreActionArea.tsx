import React, { useMemo } from "react";
import { useGuiState } from "../001_GuiStateProvider";
import { useAppState } from "../../../001_provider/001_AppStateProvider";
import { useTranslation } from "react-i18next";
import { Button } from "@fluentui/react-components";

export type MoreActionAreaProps = {};

export const MoreActionArea = (_props: MoreActionAreaProps) => {
    const { stateControls } = useGuiState();
    const { webEdition } = useAppState();
    const { t } = useTranslation();

    const serverIORecorderRow = useMemo(() => {
        const onOpenMergeLabClicked = () => {
            stateControls.showMergeLabCheckbox.updateState(true);
        };
        const onOpenAdvancedSettingClicked = () => {
            stateControls.showAdvancedSettingCheckbox.updateState(true);
        };
        const onOpenGetServerInformationClicked = () => {
            stateControls.showGetServerInformationCheckbox.updateState(true);
        };
        const onOpenGetClientInformationClicked = () => {
            stateControls.showGetClientInformationCheckbox.updateState(true);
        };
        return (
            <>
                <div className="config-sub-area-control">
                    <h3>{t('more...')}</h3>
                    <div className="config-sub-area-control-buttons">
                        <Button onClick={onOpenMergeLabClicked}>{t('merge-lab')}</Button>
                        <Button onClick={onOpenAdvancedSettingClicked}>{t('advanced-setting')}</Button>
                        <Button onClick={onOpenGetServerInformationClicked}>{t('server-info')}</Button>
                        <Button onClick={onOpenGetClientInformationClicked}>{t('client-info')}</Button>
                    </div>
                </div>
            </>
        );
    }, [stateControls]);

    if (webEdition) {
        return <> </>;
    } else {
        return <div className="config-sub-area">{serverIORecorderRow}</div>;
    }
};
