"use client";

import React from "react";
import { useMembros } from "@/hooks/useMembros";
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";
import { MembroInterface } from "@/type/membro";

export default function ListMembros() {
    const { data: membros, isLoading, isError } = useMembros();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Typography variant="h6" color="error">
                    Erro ao carregar os membros.
                </Typography>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Typography variant="h4" className="mb-4">
                Lista de Membros
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Data de Nascimento</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {membros?.map((membro: MembroInterface) => (
                            <TableRow key={membro.id}>
                                <TableCell>{membro.id}</TableCell>
                                <TableCell>{membro.nome}</TableCell>
                                <TableCell>{membro.email}</TableCell>
                                <TableCell>{membro.telefone}</TableCell>
                                <TableCell>{membro.dataNascimento}</TableCell>
                                <TableCell>{membro.status ? "Ativo" : "Inativo"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
