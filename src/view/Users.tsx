'use client';

import {
    Typography,
    Box,
    Paper,
    Grid,
    Avatar,
    alpha,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputAdornment,
    Pagination,
    Chip,
    IconButton,
    Tooltip,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { SearchOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/api/apiService';

interface User {
    _id: string;
    deviceId: string;
    device: string;
    totalApplications: number;
    totalMembers: number;
    createdAt: string;
}

interface Stats {
    totalUsers: number;
    androidUsers: number;
    iosUsers: number;
    totalApplications: number;
}

export default function Users() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState<Stats>({ totalUsers: 0, androidUsers: 0, iosUsers: 0, totalApplications: 0 });
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(false);

    // Fetch stats (only once on mount)
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response: any = await apiService.getUserStats();
                if (response?.data) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    // Fetch users (whenever page or rowsPerPage changes)
    const fetchUsers = useCallback(async (currentPage: number, limit: number) => {
        setIsTableLoading(true);
        try {
            const response: any = await apiService.getAllUsers({ page: currentPage, limit });
            if (response?.data) {
                setUsers(response.data.users || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
                setTotalUsers(response.data.pagination?.totalUsers || 0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
            setIsTableLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers(page, rowsPerPage);
    }, [page, rowsPerPage, fetchUsers]);

    // Client-side search filter
    const filteredUsers = searchTerm
        ? users.filter(user => user.deviceId.toLowerCase().includes(searchTerm.toLowerCase()))
        : users;

    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                    <i className='tabler-users text-3xl mr-2 text-[inherit]' />
                    Users Management
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 1,
                            boxShadow: theme => `0 0 10px 0 ${theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.1)' : 'rgba(19, 17, 32, 0.1)'}`
                        }}
                    >
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant='h6' sx={{ fontWeight: 600 }}>Statistics</Typography>
                        </Box>

                        <Grid container spacing={4}>
                            {/* Total Users */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Avatar
                                        variant='rounded'
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.12),
                                            color: 'primary.main'
                                        }}
                                    >
                                        <i className='tabler-user text-[26px]' />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>{stats.totalUsers}</Typography>
                                        <Typography variant='body2' color='text.secondary'>Total Users</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Android Users */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Avatar
                                        variant='rounded'
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            backgroundColor: theme => alpha(theme.palette.success.main, 0.12),
                                            color: 'success.main'
                                        }}
                                    >
                                        <i className='tabler-brand-android text-[26px]' />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>{stats.androidUsers}</Typography>
                                        <Typography variant='body2' color='text.secondary'>Android Users</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* iOS Users */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Avatar
                                        variant='rounded'
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            backgroundColor: theme => alpha(theme.palette.info.main, 0.12),
                                            color: 'info.main'
                                        }}
                                    >
                                        <i className='tabler-brand-apple text-[26px]' />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>{stats.iosUsers}</Typography>
                                        <Typography variant='body2' color='text.secondary'>iOS Users</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Total Applications */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Avatar
                                        variant='rounded'
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            backgroundColor: theme => alpha(theme.palette.warning.main, 0.12),
                                            color: 'warning.main'
                                        }}
                                    >
                                        <i className='tabler-file-analytics text-[26px]' />
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>{stats.totalApplications}</Typography>
                                        <Typography variant='body2' color='text.secondary'>Applications</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Users Table */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ boxShadow: theme => `0 0 10px 0 ${theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.1)' : 'rgba(19, 17, 32, 0.1)'}` }}>
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                <TextField
                                    select
                                    size="small"
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(parseInt(e.target.value, 10));
                                        setPage(1);
                                    }}
                                    sx={{ width: 80 }}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                </TextField>
                            </Box>

                            <TextField
                                size="small"
                                placeholder="Search Device ID"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                                sx={{ minWidth: 250 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        {isLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 6 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead sx={{
                                            backgroundColor: 'background.default',
                                            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                                            '& .MuiTableCell-root': {
                                                py: 3,
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                fontSize: '0.8125rem',
                                                letterSpacing: '1px'
                                            }
                                        }}>
                                            <TableRow>
                                                <TableCell>Device ID</TableCell>
                                                <TableCell>Device</TableCell>
                                                <TableCell align="center">Applications</TableCell>
                                                <TableCell align="center">Members</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{
                                            '& .MuiTableCell-root': {
                                                py: 2,
                                                fontSize: '0.9375rem',
                                                color: 'text.secondary'
                                            }
                                        }}>
                                            {isTableLoading ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                                        <CircularProgress size={30} />
                                                    </TableCell>
                                                </TableRow>
                                            ) : filteredUsers.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                                        <Typography color="text.secondary">No users found</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredUsers.map((user) => (
                                                    <TableRow key={user._id} hover>
                                                        <TableCell sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                            {user.deviceId}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <i className={`tabler-brand-${user.device === 'android' ? 'android' : 'apple'} text-xl`}
                                                                    style={{ color: user.device === 'android' ? '#3DDC84' : '#000000' }} />
                                                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{user.device}</Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={user.totalApplications}
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{ minWidth: 40, fontWeight: 600 }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={user.totalMembers}
                                                                size="small"
                                                                color="success"
                                                                variant="outlined"
                                                                sx={{ minWidth: 40, fontWeight: 600 }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Tooltip title="View Details">
                                                                <IconButton size="small">
                                                                    <VisibilityOutlined fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Box sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: 'background.paper',
                                    borderTop: (theme) => `1px solid ${theme.palette.divider}`
                                }}>
                                    <Typography color="text.disabled" variant="body2">
                                        {`Showing ${filteredUsers.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, totalUsers)} of ${totalUsers} entries`}
                                    </Typography>
                                    <Pagination
                                        shape="rounded"
                                        color="primary"
                                        count={totalPages}
                                        page={page}
                                        onChange={(e, v) => setPage(v)}
                                        showFirstButton
                                        showLastButton
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                borderRadius: '4px',
                                            }
                                        }}
                                    />
                                </Box>
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
