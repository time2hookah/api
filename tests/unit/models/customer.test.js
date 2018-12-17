const {
    Customer,
    validate
} = require('../../../models/customer');

describe('Customer Model', () => {

    it('should validate customer object required properties', () => {

        const customer = new Customer({
            firstName: 'Shirak',
            lastName: 'Avakian',
            phone: '123',
            email: 'test',
            address1: '123 main',
            address2: '',
            city: 'Glendale',
            state: 'CA',
            zipcode: '91215'
        });

        const result = validate(customer);
        expect(result.status).toBe(200);
    })
});