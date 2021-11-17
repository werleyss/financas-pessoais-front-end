export class FinanceiroViewModel {
    id?: number; 
    descricao?: string;
    valor?: number; 
    tipo?: 'R'|'P';
    status?: string;
    dt_vencimento: Date;
    dt_pagamento: Date;
    conta_id?: number; 
    categoria_id?: number; 
}