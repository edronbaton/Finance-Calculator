// Получаем Поля
let startBtn = document.getElementsByClassName('start')[0],
   budgetValue = document.getElementsByClassName('budget-value')[0],
   dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
   levelValue = document.getElementsByClassName('level-value')[0],
   expensesValue = document.getElementsByClassName('expenses-value')[0],
   optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
   incomeValue = document.getElementsByClassName('income-value')[0],
   monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
   yearSavingValue = document.getElementsByClassName('yearsavings-value')[0],
   expensesItem = document.getElementsByClassName('expenses-item'),
   expensesBtn = document.getElementsByTagName('button')[0],
   countBtn = document.getElementsByTagName('button')[2],
   optionalExpensesBtn = document.getElementsByTagName('button')[1]
   optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item')
   incomeItem = document.getElementsByClassName('choose-income')[0]
   checkSavings = document.querySelector('#savings'),
   sumValue = document.querySelector('.choose-sum')
   percentValue  = document.querySelector('.choose-percent')
   yearValue = document.querySelector('.year-value'),
   monthValue = document.querySelector('.month-value'),
   dayValue = document.querySelector('.day-value');


let money, time;

window.addEventListener('DOMContentLoaded', function () {
    startBtn.addEventListener('click', function () {
        time = prompt("Введите дату в формате YYYY-MM-DD");
        money = +prompt("Ваш бюджет на месяц?"); 
        while(isNaN(money) || money == "" || money == null) {
            money = +prompt("Ваш бюджет на месяц?");
        }
     
        appData.budget = money;
        appData.run = true;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed(1) + ' UAH';
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth()+1;
        dayValue.value = new Date(Date.parse(time)).getDate()

    }),

    expensesBtn.addEventListener('click', function () {
        let summ = 0;
        if (checkStart()) {
            for (let i = 0; i < expensesItem.length; i++) {
                let a = expensesItem[i].value, // Получаю название расхода
                    b = expensesItem[++i].value; // Получаю цену расхода
                if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && a.length < 50) {
                    appData.expenses[a] = b;
                    summ += +b
                    console.log(summ)
                } // прибавка цен росходов по циклу
                else {
                    i = i-1 
                }    
            }
            expensesValue.textContent = summ.toFixed() + ' UAH';
        } else {
            alert("Нажмите на нопку: Начать Отчет")
        }
        
        
        
    }),

    optionalExpensesBtn.addEventListener('click', function() {
        if (checkStart()) { 
            for (let i = 0; i < optionalExpensesItem.length; i++) {
                answer = (optionalExpensesItem[i].value)
                console.log(answer)
                appData.optionalExpenses[i] = answer;
                console.log(appData)
                optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '
    
            }
        } else {
            alert("Нажмите на нопку: Начать Отчет")
        }
    }),

    countBtn.addEventListener('click', function () {
        if (checkStart()) { 
            appData.moneyPerDay = (appData.budget / 30 ).toFixed(1);
            console.log(appData.moneyPerDay)
            for (let i = 0; i < expensesItem.length; i++){
                appData.moneyPerDay -= expensesItem[i].value/30
                console.log(appData.moneyPerDay)
            }
            
            dayBudgetValue.textContent = appData.moneyPerDay.toFixed(1)+ 'UAH'
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = 'Минимальный уровень достатка'
            }   else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = 'Средний уровень достатка'
            }   else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = 'Высокий уровень достатка'
            }   else 
                console.log("Возникла ошибка")
        } else {
            alert("Нажмите на нопку: Начать Отчет")
        }
        
    }),

    incomeItem.addEventListener('input', function() {
        appData.income = incomeItem.value.split(", ");
        incomeValue.textContent = appData.income;
    }),

    checkSavings.addEventListener('click', function() {
        if (appData.savings) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    }),
    sumValue.addEventListener('input', function() {
        if (appData.savings) {
            let summ = sumValue.value,
                percent = + percentValue.value;

            appData.monthIncome = summ/100/12*percent;
            appData.yearIncome = summ/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1)
            yearSavingValue.textContent = appData.yearIncome.toFixed(1)
       
        }   
    })
    percentValue.addEventListener('input', function() {
          if (appData.savings) {
            let summ = sumValue.value,
                percent = + percentValue.value;

            appData.monthIncome = summ/100/12*percent;
            appData.yearIncome = summ/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1) + ' UAH'
            yearSavingValue.textContent = appData.yearIncome.toFixed(1) + ' UAH'
       
        }   
    })
    function checkStart() {
        if (appData.run) {
            return true
        } else {
            return false
        }
    }
})





let appData = {
    run: false,
    budget: money,
    expenses: {}, 
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
    yearIncome: {},        
}