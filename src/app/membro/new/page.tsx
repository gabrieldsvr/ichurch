"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { useCadastrarMembro } from "@/hooks/useCadastrarMembro";
import { useRouter } from "next/navigation";

export default function NewMembroPage() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        status: true, // Status padrão: ativo
    });

    const router = useRouter();
    const { mutate, isLoading } = useCadastrarMembro();

    // Manipula mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Manipula o envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: () => {
                alert("Membro cadastrado com sucesso!");
                router.push("/membro"); // Redireciona para a listagem
            },
            onError: () => {
                alert("Erro ao cadastrar o membro.");
            },
        });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
                <Typography variant="h5" mb={2}>
                    Adicionar Novo Membro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Data de Nascimento"
                        name="dataNascimento"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                                color="primary"
                            />
                        }
                        label="Ativo"
                    />
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
