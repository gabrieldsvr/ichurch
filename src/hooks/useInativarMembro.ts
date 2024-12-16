import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useInativarMembro = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await axios.patch(`/api/membro/${id}`, { status: false });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries("membros");
        },
        onError: (error) => {
            console.error("Erro ao inativar membro:", error);
            alert("Erro ao inativar o membro.");
        },
    });
};
