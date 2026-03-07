'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    styled,
    Typography,
    IconButton,
    InputAdornment,
    Button,
    TextField,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import Logo from '@/components/layout/shared/Logo';
import { signIn } from 'next-auth/react';

const LoginIllustration = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(12),
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
        maxWidth: 480,
    },
}));

export default function LoginPage() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const loginImage = '/login.png'

    const theme = useTheme();
    const router = useRouter();

    const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
    
        // This triggers the ‘authorize’ function in Step 2
        const result = await signIn('credentials', {
            userName: userName,      // from your state
            password: password, // from your state
            redirect: false,
        });

        if (result?.error) {
            alert(result.error);
        } else {
            router.push('/dashboard'); // Redirect after success
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <LoginIllustration>
                <Box
                    component="img"
                    src={loginImage}
                    // sx={{ maxWidth: '100%', maxHeight: '50%' }}
                />
            </LoginIllustration>

            <RightWrapper>
                <Box sx={{ position: 'absolute', top: 32, left: 32 }}>
                    <Logo />
                </Box>

                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 700 }}>
                            Welcome to IPO Diary! 👋🏻
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Please sign-in to your account and start the adventure
                        </Typography>
                    </Box>

                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            autoFocus
                            label="Username"
                            sx={{ mb: 4 }}
                            placeholder="admin"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="············"
                            sx={{ mb: 4 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={isPasswordShown ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={handleClickShowPassword}>
                                            {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                            <Typography variant="body2" component={Link} href="#" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Forgot Password?
                            </Typography>
                        </Box>

                        <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 4 }}>
                            Login
                        </Button>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                            <Typography component={Link} href="#" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Create an account
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </RightWrapper>
        </Box>
    );
}
