/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";

import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
const theme = createTheme({
    palette: {
      primary: {
        main: "#4821e7cc", // Replace the primary color with the provided color
      },
    },
  });

const Pagination1 = ({ currentPage, totalPages, onPageChange }) => {
    
  
    return (
        <div
        style={{ display: "flex", marginTop: "3rem", justifyContent: "center" }}
      >
        <ThemeProvider theme={theme}>
        <Stack spacing={2} justifyContent="center">

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                  color: "black", // Set the default color for pagination numbers
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                    color: "white", // Set the color for the focused pagination number
                    fontWeight: "bold", // Optionally, apply other styles
                },
            }}
            />
            </Stack>
        </ThemeProvider>
      </div>
    );
  };
  
  export default Pagination1;