import { HttpErrorResponse } from "@angular/common/http";

export class Uteis {
    static ObterErroApi(error: HttpErrorResponse): string | any {
        if (typeof error == 'object') {
            for (let k in error) {
                if (error.hasOwnProperty(k)) {
                    let f = error[k];
                    if (typeof f === 'object') {
                        for (let g in f) {
                            if (f.hasOwnProperty(g)) {
                                return f[g];
                            }
                        }
                    }
                    return f;
                }
            }
        }
        return error;

    }

    static RemoverCamposVazioArray(dados: Array<any>) {
        return dados.filter(dadosArray => dadosArray !== '');
    }

    static ConverterObjetoToArray(dados: object) {
        return this.RemoverCamposVazioArray(Object.values(dados));
    }

    static obterDataAtual() {
        return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() <= 9 ? '0' + new Date().getDate() : new Date().getDate()}`;
    }

    static obterDataInicial(): string {
        return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`;
    }

    static obterDataFinal(): string {
        return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}`;
    }


}

