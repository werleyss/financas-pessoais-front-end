import { formatDate } from '@angular/common';

export class MensagensValidacao {
    static Obrigatorio(nomeCampo: string){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        }

        return `${nomeCampo} é obrigatório.`;
    }

    static MinimoCaracteres(nomeCampo: string, quantidadeCaracteres: number) {
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        } else if (quantidadeCaracteres < 0) {
            throw new Error('Quantidade de Caracteres deve ser maior que 0');
        } else if (!Number.isInteger(quantidadeCaracteres)) {
            throw new Error('Quantidade minima de Caracteres deve ser numeros inteiros');
        }

        return `${nomeCampo} precisa ter no mínimo ${quantidadeCaracteres} caracteres.`;
    }

    static MaximoCaracteres(nomeCampo: string, quantidadeCaracteres: number){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        } else if (quantidadeCaracteres < 0) {
            throw new Error('Quantidade de Caracteres deve ser maior que 0');
        } else if (!Number.isInteger(quantidadeCaracteres)) {
            throw new Error('Quantidade maxima de Caracteres deve ser numeros inteiros');
        }

        return `${nomeCampo} precisa ter no máximo ${quantidadeCaracteres} caracteres.`;
    }

    static ValorMinimo(nomeCampo: string, valorMinimo: number){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        }

        return `${nomeCampo} não pode ser menor que ${valorMinimo}`;
    }

    static ValorMaximo(nomeCampo: string, valorMaximo: number){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        }

        return `${nomeCampo} não pode ser maior que ${valorMaximo}`;
    }

    static DataMinimo(nomeCampo: string, dataMinima: Date, somenteData: boolean = true){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        }

        return `${nomeCampo} não pode ser menor que ${formatDate(dataMinima, `dd/MM/yyyy${somenteData ? '': ' HH:mm:ss'}`, 'pt')}`;
    }

    static DataMaxima(nomeCampo: string, dataMaxima: Date, somenteData: boolean = true){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        }

        return `${nomeCampo} não pode ser maior que ${formatDate(dataMaxima, `dd/MM/yyyy${somenteData ? '': ' HH:mm:ss'}`, 'pt')}.`;
    }

    static FormatoInvalido(nomeCampo: string){
        if (nomeCampo === null || nomeCampo.length === 0) {
            throw new Error('Nome do Campo não informado');
        }

        return `${nomeCampo} invalido`;
    }
}
