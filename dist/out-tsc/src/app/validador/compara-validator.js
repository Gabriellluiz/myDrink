// Validador customizado para comparar dois campos
export function ComparaValidator(controleNome, comparacaoNome) {
    return function (formGroup) {
        // Pega os campos conforme os nomes que foram passados
        var controle = formGroup.controls[controleNome];
        var comparacao = formGroup.controls[comparacaoNome];
        // Verifica se o primeiro campo atende todas as validações
        if (controle.errors) {
            return;
        }
        // Verifica se o campos são iguais
        if (controle.value !== comparacao.value) {
            // Se não for, cria o erro "comparacao"
            comparacao.setErrors({ comparacao: true });
        }
        else {
            // Caso contrário zera os erros.
            comparacao.setErrors(null);
        }
    };
}
//# sourceMappingURL=compara-validator.js.map