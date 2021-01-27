interface DataSourceItem {
    date: string;
    title: string;
    text: string;
}
interface TimelineItem {
    year: string;
    month: string;
    day: string;
    time: string;
    title: string;
    text: string;
}
interface Timeline {
    record: TimelineItem[];
}
export declare const useTimeline: (dataSource: DataSourceItem[]) => Timeline;
export {};
