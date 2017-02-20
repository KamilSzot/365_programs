declare namespace TL {
    export interface ITimeline {
            new (containerId: HTMLElement, data: string | ITimelineConfig, options?: ITimelineOptions): ITimeline;
    }
}