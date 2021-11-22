export class FinanceiroViewModel {
    id?: number; 
    descricao?: string;
    valor?: number; 
    tipo?: 'R'|'P';
    status?: string;
    dt_vencimento: Date;
    dt_vencimento_inicial: string;
    dt_vencimento_final: string;
    dt_pagamento: Date;
    dt_pagamento_inicial: string;
    dt_pagamento_final: string;
    conta_id?: number; 
    categoria_id?: number; 
}