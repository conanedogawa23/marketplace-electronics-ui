import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: '#475467',
    fontSize: '14px',
}));
const StyledChildrenTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: '600',
}));

type HeadCell = {
    id: string;
    label: string;
};

type RowProps<RowDataType> = {
    row: RowDataType & { childTable: any[]; locationId?: string };
    childHeadCells: HeadCell[];
    setRowId?: (id?: string) => void;
};

function Row<RowDataType>({
    row,
    childHeadCells,
    setRowId,
}: RowProps<RowDataType>) {
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    return (
        <>
            <TableRow>
                <TableCell
                    sx={{
                        width: '10px',
                        paddingRight: '0px',
                        borderBottom: 'none',
                    }}
                >
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => {
                            setCollapseOpen(!collapseOpen);
                            !collapseOpen &&
                                setRowId &&
                                setRowId(row.locationId);
                        }}
                        style={{ padding: '0px' }}
                    >
                        {collapseOpen ? (
                            <KeyboardArrowDownIcon />
                        ) : (
                            <KeyboardArrowRightIcon />
                        )}
                    </IconButton>
                </TableCell>
                {Object.keys(row).map(
                    (key, index) =>
                        key !== 'childTable' &&
                        key !== 'locationId' &&
                        key !== 'bin' && (
                            <TableCell
                                key={index}
                                component='th'
                                scope='row'
                                sx={{
                                    fontWeight: index === 0 ? '600' : 'normal',
                                    color: '#475467',
                                    paddingLeft: index === 0 ? '10px' : '0px',
                                    borderBottom: 'none',
                                }}
                            >
                                {(row as any)[key]}
                            </TableCell>
                        ),
                )}
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={collapseOpen} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Box
                                sx={{
                                    margin: 1,
                                    maxHeight: '300px',
                                    overflow: 'scroll',
                                }}
                            >
                                <Table
                                    size='small'
                                    aria-label='purchases'
                                    sx={{ borderRadius: '8px' }}
                                >
                                    <TableHead
                                        sx={{
                                            backgroundColor: '#F9FAFB',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <TableRow>
                                            {childHeadCells.map((headCell) => (
                                                <StyledTableCell
                                                    sx={{
                                                        paddingLeft:
                                                            headCell.id ===
                                                            'item'
                                                                ? '30px'
                                                                : '16px',
                                                    }}
                                                    key={headCell.id}
                                                    align='left'
                                                >
                                                    {headCell.label}
                                                </StyledTableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(row.childTable as any[]).map(
                                            (childTableRow, index) => (
                                                <TableRow key={index}>
                                                    <StyledChildrenTableCell
                                                        sx={{
                                                            padding:
                                                                '10px 10px 10px 30px',
                                                        }}
                                                        component='th'
                                                        scope='row'
                                                    >
                                                        {childTableRow.item}
                                                    </StyledChildrenTableCell>
                                                    {Object.keys(
                                                        childTableRow,
                                                    ).map(
                                                        (childKey, index) =>
                                                            childKey !==
                                                                'item' && (
                                                                <TableCell
                                                                    key={index}
                                                                    sx={{
                                                                        color: '#475467',
                                                                    }}
                                                                    align='left'
                                                                >
                                                                    {
                                                                        childTableRow[
                                                                            childKey
                                                                        ]
                                                                    }
                                                                </TableCell>
                                                            ),
                                                    )}
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

type CollapsibleTableProps<RowDataType> = {
    parentHeadCells: HeadCell[];
    childHeadCells: HeadCell[];
    rows: (RowDataType & { childTable: any[] })[];
    isLoading?: boolean;
    noDataElement?: React.ReactNode;
    setRowId?: (id?: string) => void;
};

export default function CollapsibleTable<RowDataType>({
    parentHeadCells,
    childHeadCells,
    rows,
    isLoading,
    noDataElement,
    setRowId,
}: CollapsibleTableProps<RowDataType>) {
    if (!rows.length) {
        return noDataElement;
    }
    return (
        <TableContainer
            sx={{
                height: '85vh',
                marginTop: '26px',
                border: '1px solid #EAECF0',
                boxShadow: 'none',
                borderRadius: '8px',
                overflow: 'scroll',
            }}
            component={Paper}
        >
            {isLoading && (
                <LinearProgress color='secondary' sx={{ width: '100%' }} />
            )}
            <Table aria-label='collapsible table' sx={{ border: 'none' }}>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#F9FAFB',
                        }}
                    >
                        <TableCell />
                        {parentHeadCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align='left'
                                sx={{ paddingLeft: '0px' }}
                            >
                                {headCell.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, index) => (
                        <Row<RowDataType>
                            key={index}
                            row={row}
                            setRowId={setRowId}
                            childHeadCells={childHeadCells}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
