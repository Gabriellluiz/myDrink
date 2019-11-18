import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
describe('CategoriaService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CategoriaService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=categoria.service.spec.js.map