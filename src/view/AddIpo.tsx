'use client';

import { useState } from 'react';
import {
    Typography,
    Box,
    Grid,
    Paper,
    Divider,
    Button,
    MenuItem,
    CircularProgress,
    alpha
} from '@mui/material';
import CustomTextField from '@/components/mui/TextField';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { apiService } from '@/api/apiService';

export default function AddIpo() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        logoUrl: '',
        logoFile: null as File | null,
        issueType: '',
        status: '',
        openDate: '',
        closeDate: '',
        listingDate: '',
        price: '',
        lotSize: '',
        minInvestament: '',
        issueSize: '',
        about: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, logoFile: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.companyName || !formData.logoFile || !formData.issueType || !formData.status) {
            toast.error('Please fill required fields (Name, Issue Type, Status, and Logo) before submitting.');
            return;
        }

        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('companyName', formData.companyName);
            submitData.append('image', formData.logoFile);
            submitData.append('issueType', formData.issueType);
            submitData.append('status', formData.status);

            // Convert local date 'YYYY-MM-DD' to ISO Date if present
            if (formData.openDate) submitData.append('openDate', new Date(formData.openDate).toISOString());
            if (formData.closeDate) submitData.append('closeDate', new Date(formData.closeDate).toISOString());
            if (formData.listingDate) submitData.append('listingDate', new Date(formData.listingDate).toISOString());

            submitData.append('price', formData.price);
            submitData.append('lotSize', formData.lotSize);
            submitData.append('minInvestament', formData.minInvestament);
            submitData.append('issueSize', formData.issueSize);
            submitData.append('about', formData.about);

            await apiService.createIpo(submitData);

            toast.success('IPO added successfully!');
            setTimeout(() => {
                router.push('/ipo-list');
            }, 1000);
        } catch (error: any) {
            console.error('Error adding IPO:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Failed to add IPO';
            toast.error(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                <i className='tabler-business text-3xl mr-2 text-[inherit]' />
                Add New IPO
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Top Row: Basic Details & Logo */}
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                height: '100%',
                                boxShadow: theme => `0 0 10px 0 ${theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.1)' : 'rgba(19, 17, 32, 0.1)'}`
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', fontSize: '1.25rem' }}>
                                <i className='tabler-info-circle text-xl mr-2 text-[inherit]' />
                                IPO Basic Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Company Name"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <CustomTextField
                                        fullWidth
                                        select
                                        label="Issue Type"
                                        name="issueType"
                                        value={formData.issueType}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="" disabled>Select Issue Type</MenuItem>
                                        <MenuItem value="mainboard">Mainboard</MenuItem>
                                        <MenuItem value="sme">SME</MenuItem>
                                    </CustomTextField>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <CustomTextField
                                        fullWidth
                                        select
                                        label="Status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="" disabled>Select Status</MenuItem>
                                        <MenuItem value="upcoming">Upcoming</MenuItem>
                                        <MenuItem value="open">Open</MenuItem>
                                        <MenuItem value="closed">Closed</MenuItem>
                                    </CustomTextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                height: '100%',
                                boxShadow: theme => `0 0 10px 0 ${theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.1)' : 'rgba(19, 17, 32, 0.1)'}`
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', fontSize: '1.25rem' }}>
                                <i className='tabler-image text-xl mr-2 text-[inherit]' />
                                Company Logo
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Box
                                sx={{
                                    border: '2px dashed rgba(0, 0, 0, 0.12)',
                                    borderRadius: 1,
                                    p: 4,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
                                    '&:hover': {
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                                        borderColor: 'primary.main'
                                    },
                                    height: 'calc(100% - 80px)', // Adjust for header and divider
                                    minHeight: '160px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={() => document.getElementById('logo-upload')?.click()}
                            >
                                {formData.logoFile ? (
                                    <Box component="img" src={URL.createObjectURL(formData.logoFile)} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <>
                                        <i className='tabler-upload text-4xl mb-2 text-secondary' />
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            Click to upload logo
                                        </Typography>
                                    </>
                                )}
                                <input
                                    type="file"
                                    id="logo-upload"
                                    hidden
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Bottom Section: Dates & Financials - Full Width */}
                    <Grid size={{ xs: 12 }}>
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                boxShadow: theme => `0 0 10px 0 ${theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.1)' : 'rgba(19, 17, 32, 0.1)'}`
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', fontSize: '1.25rem' }}>
                                <i className='tabler-settings text-xl mr-2 text-[inherit]' />
                                IPO Details & Financials
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={3}>
                                {/* Line 1: Dates */}
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Open Date"
                                        type="date"
                                        name="openDate"
                                        value={formData.openDate}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Close Date"
                                        type="date"
                                        name="closeDate"
                                        value={formData.closeDate}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Listing Date"
                                        type="date"
                                        name="listingDate"
                                        value={formData.listingDate}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* Line 2: Price & Lot */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Price Band"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="e.g. 450-480"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Lot Size"
                                        type="number"
                                        name="lotSize"
                                        value={formData.lotSize}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* Line 3: Investment & Size */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Minimum Investment"
                                        type="number"
                                        name="minInvestament"
                                        value={formData.minInvestament}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <CustomTextField
                                        fullWidth
                                        label="Issue Size"
                                        name="issueSize"
                                        value={formData.issueSize}
                                        onChange={handleChange}
                                        placeholder="e.g. 250 Cr"
                                    />
                                </Grid>

                                {/* Line 4: About */}
                                <Grid size={{ xs: 12 }}>
                                    <CustomTextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="About Company"
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ px: 2, py: 1, fontWeight: 600, borderRadius: '8px' }}
                    >
                        {loading ? <CircularProgress size={20} sx={{ color: 'white', mr: 2 }} /> : 'Submit'}
                    </Button>
                </Box>
            </form>
            <Toaster position="bottom-right" />
        </Box>
    );
}