import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Método POST para cadastrar membros (já existente)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { nome, email, telefone, dataNascimento } = body;

        if (!nome || !email || !dataNascimento) {
            return NextResponse.json(
                { error: "Nome, email e data de nascimento são obrigatórios." },
                { status: 400 }
            );
        }

        const membro = await prisma.membro.create({
            data: {
                nome,
                email,
                telefone: telefone || "",
                dataNascimento,
                status: "ativo",
            },
        });

        return NextResponse.json(membro, { status: 201 });
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}

// Método GET para listar membros
export async function GET() {
    try {
        const membros = await prisma.membro.findMany({
            orderBy: { id: "asc" }, // Ordena os membros pelo ID
        });

        return NextResponse.json(membros, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar membros:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}
