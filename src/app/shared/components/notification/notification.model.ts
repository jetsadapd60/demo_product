export type NotifacationType = 'Success' | 'Confirm' | 'Pending' | 'Failed';
// export type NotifacationType = 'completed' | 'failed' | 'processing' | 'information' | 'confirmation';

export interface Notifacation {
    head: string;
    title: string;
    type: NotifacationType;
    stype: {
        icon?: string;
        bgColor?: string;
        color?: string;
        fontSize?: string;
    }
}
