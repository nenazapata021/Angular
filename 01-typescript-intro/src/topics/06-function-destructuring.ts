export interface Product {
    description: string;
    price: number;
}

const phone : Product = {
    description: 'Nokia A1',
    price: 150.000
}

const tablet: Product = {
    description: 'iPad Air',
    price: 250.000
}

interface TaxCalculationOpctions {
    tax: number;
    products: Product[];
}

export function TaxCalculation( options: TaxCalculationOpctions ): [number, number] {
    const { tax, products } = options;

    let total = 0;

    products.forEach( ({ price }) => {
        total += price;
    });
    
    return [total, total * tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15;
const [total, taxTotal] = TaxCalculation ({
    products: shoppingCart,
    tax: tax,
});

// console.log('Total', total);
// console.log('Total', taxTotal);

