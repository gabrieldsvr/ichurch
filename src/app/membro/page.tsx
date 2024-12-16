"use client";

import React from "react";
import { useMembros } from "@/hooks/useMembros";
import {
    CircularProgress,
    Typography,
    Box,
    Button,
    IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";

export default function MembroPage() {
    const { data: membros, isLoading, isError } = useMembros();

    // Configuração das colunas do DataGrid
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "nome", headerName: "Nome", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "telefone", headerName: "Telefone", width: 150 },
        { field: "dataNascimento", headerName: "Data de Nascimento", width: 180 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Typography color={params.row.status ? "primary" : "error"}>
                    {params.row.status ? "Ativo" : "Inativo"}
                </Typography>
            ),
        },
        {
            field: "actions",
            headerName: "Ações",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleInativar(params.row.id)}>
                        <BlockIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    // Funções de manipulação (exemplos)
    const handleEdit = (id: number) => {
        alert(`Editar membro com ID: ${id}`);
    };

    const handleInativar = (id: number) => {
        alert(`Inativar membro com ID: ${id}`);
    };

    return (
        <Box sx={{ padding: "16px", height: "100%" }}>
            {/* Título e Botão de Adicionar */}
            <Box
                sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}
            >
                <Typography variant="h4">Gerenciamento de Membros</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => alert("Adicionar novo membro")}
                >
                    Adicionar Novo
                </Button>
            </Box>

            {/* Exibição de Erro ou Carregamento */}
            {isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography variant="h6" color="error">
                    Erro ao carregar os membros.
                </Typography>
            ) : (
                // DataGrid com os membros
                <Box sx={{ height: 500 }}>
                    <DataGrid
                        rows={membros || []}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        disableRowSelectionOnClick
                    />
                </Box>
            )}
        </Box>
    );
}
