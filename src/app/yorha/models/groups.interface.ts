export interface GroupList {
    Count: number;
    Items: GroupItem[];
}

export interface GroupItem {
    id: {
        S: string;
    };
    name: {
        S: string;
    };
    createdAt: {
        S: string;
    };
    createdBy: {
        S: string;
    };
}

export interface GroupCreateId {
    groupID: string;
}
