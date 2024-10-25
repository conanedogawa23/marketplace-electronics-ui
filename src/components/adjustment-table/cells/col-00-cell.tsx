import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';
import { useEffect } from 'react';

export interface Col00CellProps<T> {
    info: CellContext<T, unknown>;
    isEnabled: boolean;
}

export function Col00Cell<T>(props: Col00CellProps<T>) {
    const { info, isEnabled } = props;

    const { row } = info;

    useEffect(() => {
        if (isEnabled) {
            row.toggleExpanded(true);
        }
    }, [isEnabled, row]);

    return isEnabled && row.getCanExpand() ? (
        <IconButton size='small' onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? (
                <KeyboardArrowDown fontSize='inherit' />
            ) : (
                <KeyboardArrowRight fontSize='inherit' />
            )}
        </IconButton>
    ) : (
        <IconButton size='small' disabled>
            <KeyboardArrowRight fontSize='inherit' />
        </IconButton>
    );
}
