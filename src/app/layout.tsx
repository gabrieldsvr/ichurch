"use client";

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


import "./globals.css";
import {useState} from "react";
import {CssBaseline, Toolbar, Box} from "@mui/material";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <CssBaseline/>
            <Box    sx={{
                display: "flex",
                minHeight: "100vh", // Garante altura total da tela
            }}>
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}>
                </Sidebar>
                <Box component="main"    sx={{ flexGrow: 1, p: 3, overflow: "auto" }} onClick={() => setCollapsed(true)}>
                    <Toolbar/>
                    {children}
                </Box>
            </Box>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
        </body>
        </html>
    );
}
