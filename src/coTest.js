class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {

    for (var i = 0; i < this.products.length; i++) {
      //For future new products add new case.
      //This solution fix problem with Super Sale products.
      switch (this.products[i].name) {
        case 'Super Sale':
          this.products[i].sellIn--;
          if (this.products[i].sellIn >= 0) {
            this.products[i].price -= 2;
          }
          else {
            this.products[i].price -= 1;
          }
          if (this.products[i].price < 0) {
            this.products[i].price = 0;
          } else if (this.products[i].price > 50) {
            this.products[i].price = 50;
          }
          break;
        default:
          if (this.products[i].name != 'Full Coverage' && this.products[i].name != 'Special Full Coverage') {
            if (this.products[i].price > 0) {
              if (this.products[i].name != 'Mega Coverage') {
                this.products[i].price = this.products[i].price - 1;
              }
            }
          } else {
            if (this.products[i].price < 50) {
              this.products[i].price = this.products[i].price + 1;
              if (this.products[i].name == 'Special Full Coverage') {
                if (this.products[i].sellIn < 11) {
                  if (this.products[i].price < 50) {
                    this.products[i].price = this.products[i].price + 1;
                  }
                }
                if (this.products[i].sellIn < 6) {
                  if (this.products[i].price < 50) {
                    this.products[i].price = this.products[i].price + 1;
                  }
                }
              }
            }
          }
          if (this.products[i].name != 'Mega Coverage') {
            this.products[i].sellIn = this.products[i].sellIn - 1;
          }
          if (this.products[i].sellIn < 0) {
            if (this.products[i].name != 'Full Coverage') {
              if (this.products[i].name != 'Special Full Coverage') {
                if (this.products[i].price > 0) {
                  if (this.products[i].name != 'Mega Coverage') {
                    this.products[i].price = this.products[i].price - 1;
                  }
                }
              } else {
                this.products[i].price = this.products[i].price - this.products[i].price;
              }
            } else {
              if (this.products[i].price < 50) {
                this.products[i].price = this.products[i].price + 1;
              }
            }
          }
          break;
      }
    };
    return this.products;
  }
}

const productsAtDayZero = [
  new Product('Medium Coverage', 10, 20),
  new Product('Full Coverage', 2, 0),
  new Product('Low Coverage', 5, 7),
  new Product('Mega Coverage', 0, 80),
  new Product('Mega Coverage', -1, 80),
  new Product('Special Full Coverage', 15, 20),
  new Product('Special Full Coverage', 10, 49),
  new Product('Special Full Coverage', 5, 49),
  new Product('Super Sale', 3, 6),
];

const carInsurance = new CarInsurance(productsAtDayZero);
const productPrinter = function (product) {
  console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
};

//new command was added in scripts section. after-30-days
//new environment variable was added in scripts command in package.json file. TYPE_REPORT 
if (process.env.TYPE_REPORT === '30days') {
  for (let i = 1; i <= 30; i += 1) {
    console.log(`Day ${i}`);
    console.log('name, sellIn, price');
    carInsurance.updatePrice().forEach(productPrinter);
    console.log('');
  }
}
else {
  console.log(`Day ${1}`);
  console.log('name, sellIn, price');
  console.log();
  carInsurance.updatePrice().forEach(productPrinter);
  console.log('');
}

module.exports = {
  Product,
  CarInsurance
}
