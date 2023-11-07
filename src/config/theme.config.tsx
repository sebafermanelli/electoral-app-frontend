import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

type ThemeProps = {
	children: JSX.Element;
};

export enum themePalette {
	BG = '#12181B',
	PRIMARY = '#219ebc',
	SECONDARY = '#e7ecef',
	FONT_GLOBAL = "'Roboto', sans-serif",
	ERROR_MAIN = '#B35252',
	BG_ERROR_MAIN = 'rgba(244,67,54,0.1)',
	SUCCESS_MAIN = '#58B352',
	BG_SUCCESS_MAIN = 'rgba(102,187,106,0.1)',
}

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: themePalette.BG,
		},
		primary: {
			main: themePalette.PRIMARY,
		},
		secondary: {
			main: themePalette.SECONDARY,
		},
		error: {
			main: themePalette.ERROR_MAIN,
		},
		success: {
			main: themePalette.SUCCESS_MAIN,
		},
	},
	typography: {
		fontFamily: themePalette.FONT_GLOBAL,
	},
	components: {
		MuiButton: {
			defaultProps: {
				style: {
					textTransform: 'none',
				},
			},
		},
		MuiAlert: {
			defaultProps: {
				style: {
					fontSize: '1em',
				},
			},
			styleOverrides: {
				standardError: {
					border: `1px solid ${themePalette.ERROR_MAIN}`,
					background: themePalette.BG_ERROR_MAIN,
				},
				standardSuccess: {
					border: `1px solid ${themePalette.SUCCESS_MAIN}`,
					background: themePalette.BG_SUCCESS_MAIN,
				},
			},
		},
	},
});

export const ThemeConfig: React.FC<ThemeProps> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
