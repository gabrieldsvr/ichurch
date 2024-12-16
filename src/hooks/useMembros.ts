import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MembroInterface } from "@/type/membro";

// Função para buscar os membros
const fetchMembros = async (): Promise<MembroInterface[]> => {
    const response = await axios.get("/api/membro");
    return response.data;
};

// Hook ajustado para TanStack Query v5
export const useMembros = () => {
    return useQuery({
        queryKey: ["membros"], // Chave única para identificar a query
        queryFn: fetchMembros, // Função que busca os dados
        staleTime: 1000 * 60 * 5, // Dados são considerados frescos por 5 minutos
        retry: 2, // Número de tentativas em caso de erro
    });
};
