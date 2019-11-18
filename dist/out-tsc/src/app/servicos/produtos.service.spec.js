import { TestBed } from '@angular/core/testing';
import { ProdutosService } from './produtos.service';
describe('ProdutosService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ProdutosService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=produtos.service.spec.js.map