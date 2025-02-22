import React, { useMemo } from "react"
import { QualityArea } from "./102-1_QualityArea"
import { ConvertArea } from "./102-2_ConvertArea"
import { DeviceArea } from "./102-3_DeviceArea"
import { RecorderArea } from "./102-4_RecorderArea"
import { MoreActionArea } from "./102-5_MoreActionArea"
import { Card } from "@fluentui/react-components"

export type ConfigAreaProps = {
    detectors: string[]
    inputChunkNums: number[]
}


export const ConfigArea = (props: ConfigAreaProps) => {
    const configArea = useMemo(() => {
        return (
            <div className="config-area-parent">
                <Card>
                    <div className="config-area">
                        <QualityArea detectors={props.detectors}></QualityArea>
                        <ConvertArea inputChunkNums={props.inputChunkNums}></ConvertArea>
                    </div>
                    <div className="config-area audio-serverio">
                        <DeviceArea></DeviceArea>
                        <RecorderArea></RecorderArea>
                    </div>
                    <div className="config-area more-action">
                        <MoreActionArea></MoreActionArea>
                    </div>
                </Card>
            </div>
        )
    }, [])

    return configArea
}