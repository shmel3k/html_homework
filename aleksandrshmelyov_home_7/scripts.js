// excersise 1

console.log("Задание 1"); // для удобства чтения в консоли, такое в каждом задании

let balance = 1;

if (balance > 0) {
    console.log("Баланс положительный");
} else if (balance === 0) {
    console.log("Баланс равен нулю");
} else {
    console.log("Баланс отрицательный");
}

console.log(""); // для удобства чтиения в консоли, такое в каждом задании


// excersise 2

console.log("Задание 2");

let spendScore = 100;

if (spendScore >= 90) {
    console.log("Вы - мастер экономии");
    } else if (spendScore >= 70 && spendScore < 90) {
    console.log("Хороший уровень контроля расходов");
    } else if (spendScore >= 50 && spendScore < 70) {
    console.log("Средний уровень контроля расходов");
    } else {
    console.log("Стоит улучшить навыки управления финансами");
    }

console.log("");


// excersise 3

console.log("Задание 3");

let viewMode = "detailed";
let viewDesctription = viewMode === "detailed" ? "Подробный режим" : "Компактный режим";

console.log(viewDesctription);

console.log("");


// excersise 5

console.log("Задание 5");

const transactions = [
    { description: "Зарплата", amount: 50000 },
    { description: "Продукты", amount: -3000 },
    { description: "Кафе", amount: -500 }
  ];

for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    console.log(`Транзакция №:${i} ${transaction.description}, сумма: ${transaction.amount}`);
}

console.log("");

// excersise 6

console.log("Задание 6");

const categories = ["Еда", "Транспорт", "Развлечения"];
    for (let cat of categories) {
    console.log(cat);
    }

console.log("");


// excersise 7

console.log("Задание 7");

const transactions2 = [
    { description: "Зарплата", amount: 50000 },
    { description: "Аренда жилья", amount: -15000 },
    { description: "Продукты", amount: -3000 },
    { description: "Продажа старой мебели", amount: 2000 }
  ];

transactions2.forEach(transaction => {
    if (transaction.amount > 0) {
        console.log(`Доход: ${transaction.description}, сумма: ${transaction.amount}`);
    } else {
        console.log(`Расход: ${transaction.description}, сумма: ${transaction.amount}`);
    }
})

console.log("");


// excersise 8

console.log("Задание 8");

let username = "Иван";
function greetUser(name) {
    console.log(`Привет, ${name}!`);
}
greetUser(username);

console.log("");


// excersise 9

console.log("Задание 9");

const calculateFee =  (amount) => amount * 0.02;
console.log(calculateFee(10200));

console.log("");


// excersise 10

console.log("Задание 10");

expenses = [-500, -2000, -100, -1, -100500];

// простой путь
function getMinMaxExpense(arr) {
    let min = Math.max(...arr);
    let max = Math.min(...arr);
    return { min, max };
}

console.log(getMinMaxExpense(expenses));

// путь самурая c модулем

function getMinMaxExpense2(arr) {
    let min = Math.abs(arr[0]);
    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(min) >= Math.abs(arr[i])) {
            min = arr[i];
        }
    }
  
    let max = Math.abs(arr[0]);
    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(max) <= Math.abs(arr[i])) {
            max = arr[i];
        }
    }
    return { min, max };
}

console.log(getMinMaxExpense2(expenses));

console.log("");


// excersise 11

console.log("Задание 11");

let currentCurrency = "EUR";

function changeCurrency() {
    let currentCurrency = "USD";
    console.log(currentCurrency);
}

console.log(currentCurrency);

console.log("");


// excersise 12

console.log("Задание 12");

function outer() {
    let exchangeRate = 73.5;
    function inner() {
        console.log(exchangeRate);
    }
    inner();
}

outer();

console.log("");


// excersise 13

console.log("Задание 13");

function calculatePrice(price, hasPVN) {
    if (hasPVN) {
        return price / (1 + 0.21);
    } else {
        return price * (1 + 0.21);
    }
}

console.log(calculatePrice(121, true));
console.log(calculatePrice(100, false));