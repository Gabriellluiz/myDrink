import { TestBed } from '@angular/core/testing';
import { BarService } from './bar.service';
describe('BarService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BarService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=bar.service.spec.js.map