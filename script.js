// Эти переменные будут хранить в себе первое число, знак действия, и второе число, соответственно 
let first_field = null;
let second_field = "null";
let third_field = null;
fogging.classList.add('Fade');
// Данная фукнция нужная для показа/убирания затемнения и самого popup
function show(state, status){
    if (state == 'block') {
        popup.style.display = state;
        fogging.style.display = state;
        fogging.classList.remove('Fade');
        fogging.classList.add('Antifade');
    } else if (state == 'none') {
        fogging.classList.remove('Antifade');
        fogging.classList.add('Fade');
        //т.к. я хочу, чтобы галочки/восклицательные знаки уходили после изчезновения модального окна, то я задерживаю функцию очистки на 600 мс (анимация ичезновения столько же)
        setTimeout(clear, 600);
    }
    document.getElementsByTagName("HTML")[0].style.overflow = status;
}
// Данная функция убирает галочки/восклицательные знаки, значения из всех трех input, стирает также уже запомненные значения из памяти (first_field, second_field. third_field), а также ранее вычисленные значение в самом калькуляторе
function clear(){
    // Убираются со странички галочки/восклицательные знаки
    document.getElementById("first_mark").src = "";
    document.getElementById("second_mark").src = "";
    document.getElementById("third_mark").src = "";
    // Очищаются значения всех трех input
    first_field = null;
    second_field = "null";
    third_field = null;
    // Сначала получаются все три input, а потом они очищаются на странички
    let list_of_inputs = document.getElementsByClassName("inputs");
    for(let i = 0; i < list_of_inputs.length; i++)
    {
        list_of_inputs[i].value = "";
    }
    // Убирается результат вычисления со странички
    document.getElementById('answer').innerHTML = "";
}
// Данная функция нужная для галочек/восклицательных знаков напротив полей ввода в случае, если введенные значения корректны/не корректны
function to_change_mark(value, position){
    var n=value;
    // тут получается тег галочки/восклицательного знака (по типу <img src="" alt="" style="top: 75px;" id="first_mark">)
    var mark = document.getElementById(position + "_mark");
    // Эта конструкция обрабатывает знаки вычисления (делает класс галочки или класс восклицательного знака для второго поля)
    if (position === "second")
    {
        if(n === "+" || n === "-" || n === "*" || n === "**" || n === "/" || n === "//" || n === "%"){
            mark.classList.remove('exclamation_mark');
            mark.classList.add('check_mark');
            mark.src = "icons and images/check-solid.svg";
            second_field = value;
        }
        else{
            mark.classList.remove('check_mark');
            mark.classList.add('exclamation_mark');
            mark.src = "icons and images/exclamation-solid.svg";
            second_field = "null";
        }
    }
    // Вот эта конструкция обрабатывает числа/цифры из первого/третьего полей (делает класс галочки для первого или третьего поля)
    else if (isNaN(Number(n)) !== true && n !== "" && n[0] != " ")
    {
        if (position === "first")
        {
            mark.classList.remove('exclamation_mark');
            mark.classList.add('check_mark');
            mark.src = "icons and images/check-solid.svg";
            first_field = Number(value);
        }
        else if (position === "third")
        {
            mark.classList.remove('exclamation_mark');
            mark.classList.add('check_mark');
            mark.src = "icons and images/check-solid.svg";
            third_field = Number(value);
        }
    }
    // А вот эта конструкция обрабатывает числа/цифры из первого/третьего полей (делает класс восклицательного знака для первого или третьего поля)
    else
    {
        mark.classList.remove('check_mark');
        mark.classList.add('exclamation_mark');
        mark.src = "icons and images/exclamation-solid.svg";
        if (position === "first")
            first_field = null;
        else
            third_field = null;
    }
}
// Данная функция занимается самой калькуляцией, вычислением значением
function calculation(){
    if (first_field !== null && second_field !== "null" && third_field !== null){
        //т.к. знак вычисления получается в виде string, то это единственный способ, пришедший мне на ум
        switch(second_field){
            case "+":
                document.getElementById('answer').innerHTML = first_field + third_field;
                return
            case "-":
                document.getElementById('answer').innerHTML = first_field - third_field;
                return
            case "*":
                document.getElementById('answer').innerHTML = first_field * third_field;
                return
            case "**":
                document.getElementById('answer').innerHTML = first_field ** third_field;
                return
            case "/":
                document.getElementById('answer').innerHTML = first_field / third_field;
                return
            case "//":
                document.getElementById('answer').innerHTML = Math.floor(first_field / third_field);
                return
            case "%":
                document.getElementById('answer').innerHTML = first_field % third_field;
                return
        }
    }
}