import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface NovoMembro {
    nome: string;
    email: string;
    telefone?: string;
    dataNascimento: string;
    status: boolean;
}

const cadastrarMembro = async (membro: NovoMembro) => {
    const response = await axios.post("/api/membro", membro);
    return response.data;
};

export const useCadastrarMembro = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cadastrarMembro,
        onSuccess: () => {
            queryClient.invalidateQueries(["membros"]);
        },
    });
};
