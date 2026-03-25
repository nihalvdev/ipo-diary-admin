'use client'

import { apiService } from "@/api/apiService";
import { SearchOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Card, CircularProgress, Grid, InputAdornment, MenuItem, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function Feedback() {
    const [feedback, setFeedback] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);

    // Detail Modal State
    const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const fetchFeedback = useCallback(async () => {
        setIsTableLoading(true);
        try {
            const response: any = await apiService.getFeedback();
            if (response?.data) {
                setFeedback(response.data.feedbacks || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
                setTotalFeedbacks(response.data.pagination?.totalFeedbacks || response.data.feedbacks?.length || 0);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
        } finally {
            setIsLoading(false);
            setIsTableLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    // Client-side search filter
    const filteredFeedback = searchTerm
        ? feedback.filter(f =>
            (f.userId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (f.message || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        : feedback;

    // Client-side pagination
    const paginatedFeedback = filteredFeedback.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleOpenDetail = (f: any) => {
        setSelectedFeedback(f);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedFeedback(null);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                    <i className='tabler-users text-3xl mr-2 text-inherit' />
                    Feedback
                </Typography>
            </Box>

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
                        placeholder="Search Feedback"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                        <TableCell>Message</TableCell>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
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
                                            <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                                <CircularProgress size={30} />
                                            </TableCell>
                                        </TableRow>
                                    ) : paginatedFeedback.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                                <Typography color="text.secondary">No feedback found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedFeedback.map((f, index) => (
                                            <TableRow key={f._id || index} hover>
                                                <TableCell sx={{ fontWeight: 500, color: 'text.primary', maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {f.message}
                                                </TableCell>
                                                <TableCell>
                                                    {f.userId}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(f.createdAt)}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Tooltip title="View Details">
                                                        <IconButton size="small" onClick={() => handleOpenDetail(f)}>
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
                                {`Showing ${filteredFeedback.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredFeedback.length)} of ${filteredFeedback.length} entries`}
                            </Typography>
                            <Pagination
                                shape="rounded"
                                color="primary"
                                count={Math.ceil(filteredFeedback.length / rowsPerPage)}
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

            {/* Detail Dialog */}
            <Dialog
                open={isDetailOpen}
                onClose={handleCloseDetail}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Feedback Details</DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Message:</Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{selectedFeedback?.message}</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">Submitted On:</Typography>
                        <Typography variant="body2">{formatDate(selectedFeedback?.createdAt)}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetail} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}