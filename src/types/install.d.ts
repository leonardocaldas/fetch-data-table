export type EventReceived = (data: any) => void;

export type EventProxy = {
    emit: (name: string, data: any) => void,
    on: (name: string, event: EventReceived) => void,
    off: (name: string, event: any) => void,
};

export type InstallOptions = {
    eventProxy?: EventProxy,
}