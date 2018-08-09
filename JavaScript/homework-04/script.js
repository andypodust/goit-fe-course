
const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
  };
const order = {
    bread: 2,
    milk: 2,
    apples: 1,
    cheese: 1
  };

  function Cashier(name, productDatabase) {
    // 🔔 не забывайте о this при обращении к свойствам и методам будущего объекта
    this.productDatabase = productDatabase;
    this.name = name;
    this.customerMoney = 0 

    this.getCustomerMoney = function() {
        return this.customerMoney = prompt ('Введите количество ваших денег')
    };
    this.countTotalPrice = function(order) {
        let total = 0;
        let summ = 0;
        const arrProd = Object.entries(this.productDatabase);
        const arrOrd = Object.entries(order);

        for (let prod of arrOrd) {
            for(let quant of arrProd) {
                if (quant[0] === prod[0]) summ = quant[1] * prod[1]
            }
            total += summ;
        }
        return total;
    };
    this.countChange = function() {
        let changeAmount = 0;
        if (totalPrice <= this.customerMoney) {
            changeAmount = this.customerMoney - totalPrice;
            return changeAmount;
        } else {
            return null
        }
    };
    this.onSuccess = function (changeAmount) {
        return alert(`Спасибо за покупку, ваша сдача ${changeAmount}`);
    };
    this.onError = function () {
        return alert('Очень жаль, вам не хватает денег на покупки');

    };
    this.reset = function() {
        this.customerMoney = 0
    }

  }

  

  const mango = new Cashier('Mango', products);

  // Проверяем исходные значения полей
console.log(mango.name); // Mango
console.log(mango.productDatabase); // ссылка на базу данных продуктов (объект products)
console.log(mango.customerMoney); // 0

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая order - список покупок пользователя
const totalPrice = mango.countTotalPrice(order);
console.log(order)

// Проверям что посчитали
console.log(totalPrice); // 110

// Вызываем getCustomerMoney для запроса денег покупателя
mango.getCustomerMoney(300);

// Проверяем что в поле с деньгами пользователя
console.log(mango.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
const change = mango.countChange();

// Проверяем что нам вернул countChange
console.log(change); // 190

// Проверяем результат подсчета денег
if(change !== null) {
   // При успешном обслуживании вызываем метод onSuccess
  mango.onSuccess(change); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError   
  mango.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
mango.reset();

// Проверяем значения после reset
console.log(mango.customerMoney); // 0

