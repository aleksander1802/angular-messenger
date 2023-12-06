export interface Group {
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

export interface GroupName {
    name: string;
}

export interface GroupCreateId {
    groupID: string;
}

export interface GeneratedGroup {
    name: string;
    createdAt: string;
    createdBy: string;
}
