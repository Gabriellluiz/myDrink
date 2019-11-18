import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DadosBarService = /** @class */ (function () {
    function DadosBarService() {
        this.dados = [];
    }
    // Método para adicionar dados ao serviço
    DadosBarService.prototype.setDados = function (nome, dados) {
        // Verifica se o nome existe e se não está vazio.
        if (nome && nome.trim() !== '') {
            // Cria um indice no array com o nome do dado e coloca os dados dentro.
            this.dados[nome.trim()] = dados;
        }
    };
    // Método para pegar dados do serviço;
    DadosBarService.prototype.getDados = function (nome) {
        // Verifica se o nome não está vazio e se ele existe no array.
        if (nome.trim() !== '' && this.dados[nome.trim()]) {
            // Retorna os dados salvos no array.
            return this.dados[nome.trim()];
        }
        else {
            // Retorna nulo caso o nome não exista no indice.
            return null;
        }
    };
    // Método para limpar os dados guardados
    DadosBarService.prototype.removeDados = function (todos, nome) {
        // Caso deseje apagar todos os dados armazenados.
        if (todos) {
            this.dados = null;
            this.dados = [];
        }
        else if (nome.trim() !== '') {
            var index = this.dados.indexOf(nome);
            this.dados.splice(index, 1);
        }
    };
    DadosBarService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DadosBarService);
    return DadosBarService;
}());
export { DadosBarService };
//# sourceMappingURL=dados-bar.service.js.map