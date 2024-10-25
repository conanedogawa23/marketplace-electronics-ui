'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { useAuth } from '@/lib/redux/auth/useAuth';

import Logo from '../../../public/assets/logoLight.png';

const CustomInput = styled(Input)`
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    border: 1px solid
        ${({ theme, error }) =>
            error ? 'red' : theme.customColors?.border.secondary.light};

    border-radius: 8px;

    .MuiInput-input {
        height: 44px;
        padding-inline: 12px;
    }
`;

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, loginContext, error } = useAuth();
    const { isLoading } = loginContext;

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await login({ email, password, rememberMe });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={'100vh'}
            width={'100%'}
        >
            <Card
                sx={{ width: { xs: '90%', sm: '60%', md: '35%' }, padding: 2 }}
            >
                <CardContent
                    component='form'
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={Logo}
                        alt='Logo'
                        style={{
                            width: '100%',
                            maxWidth: '132px',
                            marginRight: 'auto',
                            marginBottom: '64px',
                        }}
                        height={30}
                    />

                    <Box sx={{ width: '100%', mb: 8 }}>
                        <Typography
                            variant='h4'
                            component='h1'
                            fontWeight={500}
                            fontSize={36}
                            marginBottom={0}
                            gutterBottom
                        >
                            Hey there!
                        </Typography>
                        <Typography color='text.secondary'>
                            Sign in to get started
                        </Typography>
                    </Box>

                    {error && (
                        <Typography
                            variant='body2'
                            color='error'
                            align='left'
                            sx={{ width: '100%', mb: 2 }}
                        >
                            {error.includes('Invalid password')
                                ? 'Incorrect password. Please try again.'
                                : error.includes('User not found')
                                  ? 'User not found. Please check your email and try again.'
                                  : error}
                        </Typography>
                    )}

                    <Stack
                        width={'100%'}
                        direction={'column'}
                        gap={'6px'}
                        mb={5}
                    >
                        <Typography
                            variant='body1'
                            component={'label'}
                            fontSize={14}
                            fontWeight={500}
                            sx={(theme) => ({
                                color: theme.customColors?.text.primary.light,
                            })}
                        >
                            Email
                        </Typography>

                        <CustomInput
                            autoComplete='email'
                            autoFocus
                            disableUnderline
                            fullWidth
                            id='email'
                            name='email'
                            placeholder='username@gmail.com'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Stack>

                    <Stack
                        width={'100%'}
                        direction={'column'}
                        gap={'6px'}
                        mb={4}
                    >
                        <Typography
                            variant='body1'
                            component={'label'}
                            fontSize={14}
                            fontWeight={500}
                            sx={(theme) => ({
                                color: theme.customColors?.text.primary.light,
                            })}
                        >
                            Password
                        </Typography>

                        <CustomInput
                            autoComplete='current-password'
                            disableUnderline
                            fullWidth
                            id='password'
                            margin='none'
                            name='password'
                            placeholder='••••••••'
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position='start'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        edge='start'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Stack>

                    <Stack
                        width={'100%'}
                        direction={'row'}
                        justifyContent={'space-between'}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    color='primary'
                                />
                            }
                            label='Remember me'
                        />

                        <Button
                            variant='text'
                            size='small'
                            sx={{
                                fontWeight: 500,
                                color: '#344054',
                                textTransform: 'none',
                            }}
                        >
                            Forgot Password
                        </Button>
                    </Stack>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={isLoading}
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: '#C255D9',
                            '&:hover': {
                                bgcolor: '#A845C7',
                            },
                            textTransform: 'none',
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress color='inherit' size={24} />
                        ) : (
                            'Log in'
                        )}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default LoginCard;
