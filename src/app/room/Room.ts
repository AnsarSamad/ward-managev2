export interface Room {
    roomName: string;
    roomNo: string;
    optedOutTime: string;
    optedInTime: string;
    isDoctorIn: boolean;
    desc: string;
    currentlyOptedIn: string;
    id?:string
}