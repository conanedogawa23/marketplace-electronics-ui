export interface FilterOption {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkboxColor?: string;
}

export interface FilterGroup {
    groupName: string;
    groupValue?: string;
    options: FilterOption[];
    showClearButton?: boolean;
    onClear?: () => void;
}

export interface FilterProps {
    filterGroups: FilterGroup[];
    isGlobalSearchEnabled?: boolean;
    isExpandable?: boolean;
    handleSelectedFilter?: (selectedFilter?: string) => void;
}
