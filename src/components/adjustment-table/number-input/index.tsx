import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Input, InputAdornment, styled } from '@mui/material';

const CustomInput = styled(Input)(({ theme, error }) => ({
    border: `1px solid ${
        error ? 'red' : theme.customColors?.border.secondary.light ?? ''
    }`,
    borderRadius: 3,
    paddingInline: '12px',
    height: '40px',
    '& input': {
        textAlign: 'center',
    },
    '& ::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        appearance: 'none',
        margin: 0,
    },
}));

export type NumberInputProps = {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDecrement: () => void;
    onIncrement: () => void;
    disableIncrement?: boolean;
    disableDecrement?: boolean;
    error?: boolean;
};
export const NumberInput: React.FC<NumberInputProps> = ({
    error,
    value,
    onChange,
    onDecrement,
    onIncrement,
    disableIncrement,
    disableDecrement,
}) => {
    return (
        <CustomInput
            error={error}
            disableUnderline
            type='number'
            value={value}
            onChange={onChange}
            sx={{ width: '150px' }}
            startAdornment={
                <InputAdornment position='start'>
                    <IconButton
                        onClick={onDecrement}
                        color='secondary'
                        disabled={disableDecrement}
                    >
                        <RemoveIcon />
                    </IconButton>
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position='end'>
                    <IconButton
                        onClick={onIncrement}
                        color='secondary'
                        disabled={disableIncrement}
                    >
                        <AddIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default NumberInput;
