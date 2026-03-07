'use client'

// React Imports
import { forwardRef } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'
import type { InputLabelProps } from '@mui/material/InputLabel'

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiInputLabel-root': {
        transform: 'none',
        width: 'fit-content',
        maxWidth: '100%',
        lineHeight: 1.153,
        position: 'relative',
        fontSize: theme.typography.body2.fontSize,
        marginBottom: theme.spacing(1),
        color: theme.palette.text.primary,
        '&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused': {
            color: `${theme.palette.primary.main} !important`
        },
        '&.Mui-disabled': {
            color: theme.palette.text.disabled
        },
        '&.Mui-error': {
            color: theme.palette.error.main
        }
    },
    '& .MuiInputBase-root': {
        backgroundColor: 'transparent !important',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        '&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover': {
            borderColor: theme.palette.action.active
        },
        '&:before, &:after': {
            display: 'none'
        },
        '&.MuiInputBase-sizeSmall': {
            borderRadius: '8px'
        },
        '&.Mui-error': {
            borderColor: theme.palette.error.main
        },
        '&.Mui-focused': {
            borderWidth: 2,
            '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
                transform: 'translateX(4px)'
            },
            '& :not(textarea).MuiFilledInput-input': {
                padding: '6.25px 13px'
            },
            '&:not(.Mui-error).MuiInputBase-colorPrimary': {
                borderColor: theme.palette.primary.main
            }
        },
        '&.Mui-disabled': {
            backgroundColor: `${theme.palette.action.hover} !important`
        }
    },

    // Adornments
    '& .MuiInputAdornment-root': {
        marginBlockStart: '0px !important',
        '&.MuiInputAdornment-positionStart + .MuiInputBase-input:not(textarea)': {
            paddingInlineStart: '0px !important'
        }
    },
    '& .MuiInputBase-inputAdornedEnd.MuiInputBase-input': {
        paddingInlineEnd: '0px !important'
    },

    '& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart.Mui-focused': {
        paddingInlineStart: '13px',
        '& .MuiInputBase-input': {
            paddingInlineStart: '0px !important'
        }
    },
    '& .MuiInputBase-sizeSmall.MuiInputBase-adornedStart:not(.MuiAutocomplete-inputRoot)': {
        paddingInlineStart: '14px'
    },
    '& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd:not(.MuiAutocomplete-inputRoot)': {
        paddingInlineStart: '14px'
    },
    '& .MuiInputBase-sizeSmall.MuiInputBase-adornedEnd.Mui-focused:not(.MuiAutocomplete-inputRoot)': {
        paddingInlineEnd: '13px',
        '& .MuiInputBase-input': {
            paddingInlineEnd: '0px !important'
        }
    },

    '& .MuiInputAdornment-sizeMedium': {
        'i, svg': {
            fontSize: '1.25rem'
        }
    },

    '& .MuiInputBase-input': {
        '&:not(textarea).MuiInputBase-inputSizeSmall': {
            padding: '7.25px 14px'
        },
        '&:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
            transition: theme.transitions.create(['opacity', 'transform'], {
                duration: theme.transitions.duration.shorter
            })
        }
    },
    '& :not(.MuiInputBase-sizeSmall).MuiInputBase-root': {
        borderRadius: '8px',
        fontSize: '17px',
        lineHeight: '1.41',
        '& .MuiInputBase-input': {
            padding: '10.8px 16px'
        },
        '&.Mui-focused': {
            '& .MuiInputBase-input': {
                padding: '9.8px 15px'
            }
        }
    },
    '& .MuiFormHelperText-root': {
        lineHeight: 1.154,
        margin: theme.spacing(1, 0, 0),
        fontSize: theme.typography.body2.fontSize,
        '&.Mui-error': {
            color: theme.palette.error.main
        },
        '&.Mui-disabled': {
            color: theme.palette.text.disabled
        }
    }
}))

const CustomTextField = forwardRef((props: TextFieldProps, ref) => {
    const { size = 'small', slotProps, ...rest } = props

    return (
        <TextFieldStyled
            size={size}
            inputRef={ref}
            {...rest}
            variant='filled'
            slotProps={{
                ...slotProps,
                inputLabel: { ...slotProps?.inputLabel, shrink: true } as InputLabelProps
            }}
        />
    )
})

export default CustomTextField
