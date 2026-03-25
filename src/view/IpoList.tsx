'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Card,
    Typography,
    Box,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    InputAdornment,
    Avatar,
    Tooltip,
    MenuItem,
    Pagination,
    alpha,
    CircularProgress
} from '@mui/material';
import CustomTextField from '@/components/mui/TextField';
import {
    SearchOutlined,
    AddOutlined,
    EditOutlined,
    DeleteOutline,
    VisibilityOutlined
} from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { apiService } from '@/api/apiService';

interface Ipo {
    _id: string;
    companyName: string;
    logoUrl: string;
    issueType: string;
    status: string;
    openDate: string;
    closeDate: string;
    listingDate: string;
    price: string;
    lotSize: number;
    minInvestment: number;
    issueSize: string;
    about: string;
    createdAt: string;
    updatedAt: string;
}

export default function IpoList() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [issueTypeFilter, setIssueTypeFilter] = useState('mainboard');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [ipoIdToDelete, setIpoIdToDelete] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // API data states
    const [ipos, setIpos] = useState<Ipo[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(false);

    // Fetch IPOs from API
    const fetchIpos = useCallback(async (currentPage: number, limit: number, filter: string) => {
        setIsTableLoading(true);
        try {
            const response: any = await apiService.getAllIpos({
                page: currentPage,
                limit,
                filter
            });

            if (response?.data) {
                setIpos(response.data.ipos || []);
                setTotalItems(response.data.pagination?.total || 0);
                setTotalPages(response.data.pagination?.totalPage || Math.ceil((response.data.pagination?.total || 0) / limit));
            }
        } catch (error) {
            console.error('Error fetching IPOs:', error);
            toast.error('Failed to fetch IPOs');
        } finally {
            setIsLoading(false);
            setIsTableLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIpos(page, rowsPerPage, issueTypeFilter);
    }, [page, rowsPerPage, issueTypeFilter, fetchIpos]);

    const handleOpenDeleteDialog = (id: string) => {
        setIpoIdToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setIpoIdToDelete(null);
    };

    const handleDelete = async () => {
        if (ipoIdToDelete === null) return;

        setDeleteLoading(true);

        try {
            await apiService.deleteIpo(ipoIdToDelete);
            toast.success('IPO deleted successfully');
            handleCloseDeleteDialog();
            fetchIpos(page, rowsPerPage, issueTypeFilter);
        } catch (error: any) {
            console.error('Error deleting IPO:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Failed to delete IPO';
            toast.error(`Error: ${errorMsg}`);
        } finally {
            setDeleteLoading(false);
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open': return { color: 'success', label: 'Active' };
            case 'upcoming': return { color: 'primary', label: 'Upcoming' };
            case 'closed': return { color: 'error', label: 'Inactive' };
            default: return { color: 'default', label: status };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Client-side search filter
    const filteredIpos = searchTerm
        ? ipos.filter(ipo => ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
        : ipos;

    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                IPO List
            </Typography>

            <Card sx={{ boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.1)' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
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

                        <CustomTextField
                            select
                            size="small"
                            value={issueTypeFilter}
                            onChange={(e) => {
                                setIssueTypeFilter(e.target.value);
                                setPage(1);
                            }}
                            sx={{ minWidth: 150 }}
                            slotProps={{
                                select: { displayEmpty: true }
                            }}
                        >
                            <MenuItem value="mainboard">Mainboard</MenuItem>
                            <MenuItem value="sme">SME</MenuItem>
                        </CustomTextField>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 4, flexGrow: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
                        <TextField
                            size="small"
                            placeholder="Search IPO"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flexGrow: 1, minWidth: { sm: 200 } }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlined fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddOutlined />}
                            sx={{ whiteSpace: 'nowrap' }}
                            onClick={() => router.push('/add-ipo')}
                        >
                            Add New IPO
                        </Button>
                    </Box>
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
                                        py: 2,
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontSize: '0.8125rem',
                                        letterSpacing: '1px',
                                        color: 'text.primary'
                                    }
                                }}>
                                    <TableRow>
                                        <TableCell>IPO Name</TableCell>
                                        <TableCell>Issue Type</TableCell>
                                        <TableCell>Price Band</TableCell>
                                        <TableCell>Lot Size</TableCell>
                                        <TableCell>Listing Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{
                                    '& .MuiTableCell-root': {
                                        py: 2,
                                        fontSize: '0.9375rem',
                                        color: 'text.secondary',
                                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                                    },
                                    '& .MuiTableRow-root:hover': {
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04)
                                    }
                                }}>
                                    {isTableLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                                <CircularProgress size={30} />
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredIpos.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                                <Typography color="text.secondary">No IPOs found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredIpos.map((row) => {
                                            const status = getStatusStyles(row.status);
                                            return (
                                                <TableRow key={row._id}>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar
                                                                src={row.logoUrl}
                                                                sx={{
                                                                    width: 38,
                                                                    height: 38,
                                                                    mr: 3,
                                                                    fontSize: '0.875rem',
                                                                    fontWeight: 600,
                                                                    backgroundColor: (theme) => alpha(theme.palette[status.color as 'primary' | 'success' | 'error'].main, 0.12),
                                                                    color: (theme) => theme.palette[status.color as 'primary' | 'success' | 'error'].main
                                                                }}
                                                            >
                                                                {row.companyName?.charAt(0)}
                                                            </Avatar>
                                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                                    {row.companyName}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                                                    {row.issueSize}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
                                                            {row.issueType}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>₹{row.price}</TableCell>
                                                    <TableCell>{row.lotSize}</TableCell>
                                                    <TableCell>{formatDate(row.listingDate)}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={status.label}
                                                            size="small"
                                                            sx={{
                                                                fontWeight: 500,
                                                                textTransform: 'capitalize',
                                                                backgroundColor: (theme) => alpha(theme.palette[status.color as 'primary' | 'success' | 'error'].main, 0.16),
                                                                color: (theme) => theme.palette[status.color as 'primary' | 'success' | 'error'].main,
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                            <Tooltip title="Delete">
                                                                <IconButton size="small" onClick={() => handleOpenDeleteDialog(row._id)}>
                                                                    <DeleteOutline fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="View">
                                                                <IconButton size="small">
                                                                    <VisibilityOutlined fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Edit">
                                                                <IconButton size="small" onClick={() => router.push(`/update-ipo/${row._id}`)}>
                                                                    <EditOutlined fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
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
                                {`Showing ${filteredIpos.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, totalItems)} of ${totalItems} entries`}
                            </Typography>
                            <Pagination
                                shape="rounded"
                                color="primary"
                                count={totalPages || Math.ceil(totalItems / rowsPerPage)}
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

            {/* Styled Delete Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                PaperProps={{
                    sx: {
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '12px'
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: 'text.primary',
                        p: 2
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className='tabler-alert-circle' style={{ color: '#FF4D49', fontSize: '22px' }} />
                        Delete IPO
                    </div>
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Are you sure you want to delete this IPO? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'flex-end',
                        gap: 2,
                        p: 2
                    }}
                >
                    <Button onClick={handleCloseDeleteDialog} variant='outlined' color='secondary' sx={{ minWidth: '90px', borderRadius: '8px' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant='contained'
                        color='error'
                        disabled={deleteLoading}
                        sx={{ minWidth: '90px', borderRadius: '8px' }}
                    >
                        {deleteLoading ? (
                            <>
                                <CircularProgress size={20} sx={{ color: 'white', marginRight: 2 }} />
                                Delete
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
            <Toaster position="bottom-right" />
        </Box>
    );
}