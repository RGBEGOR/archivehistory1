const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 6),
	new Result("Ваш уровень выше среднего", 8),
	new Result("Поздравляем Вы успешно усвоили эту тему", 9)
];


const questions = 
[
	new Question(" В какой период произошло Великое переселение народов? ", 
	[
		new Answer('I-VIII веке', 0),
		new Answer("VI-XVI веке ", 0),
		new Answer("IV-VIII веке", 0),
		new Answer("VI-VII веке", 1)
	]),
	new Question("Какие основные причины вызвали это(великое переселение народов) явление?", 
	[
		new Answer('Климатические условия, упадок Римской Империи', 1),
		new Answer("Расцвет Средневековья", 0),
		new Answer("Упадок Византийской империи", 0),
		new Answer("Желание захватить весь мир", 0)
	]),
	new Question("В IV веке основу римского войска стали составлять:? ", 
	[
		new Answer('Рабы ', 0),
		new Answer("Плебеи", 0),
		new Answer("Германцы и Американцы ", 0),
		new Answer("Варвары и наемники", 1)
	]),
	new Question("Как звали последнего императора западной Римской империи ", 
	[
		new Answer('Константин ', 0),
		new Answer("Ромул Август", 1),
		new Answer("Траян", 0),
		new Answer("Калигула", 0)
	]),
	new Question("Укажите имя варвара, прославившегося взятием «Вечного города»", 
	[
		new Answer(' Алларих ', 1),
		new Answer("Стилихон ", 0),
		new Answer("Атилла ", 0),
		new Answer("Хлодвиг", 0)

	]),
	new Question(" Как назывались военные вожди в племени германцев?  ", 
	[
		new Answer('Король ', 0),
		new Answer("Конунг", 1),
		new Answer("Аталык ", 0),
		new Answer("Вождь", 0)
	]),
	new Question("Укажите имя варвара, низложившего в 476 году последнего императора Ромула Августула? ", 
	[
		new Answer('Аларих', 0),
		new Answer("Стилихон", 0),
		new Answer("Одоакр ", 1),
		new Answer("Аттила", 0)
	]),
	new Question("При каких императорах начинается кризис Римской империи? ", 
	[
		new Answer('Траян и Константин', 0),
		new Answer("Нерон и Калигула ", 1),
		new Answer("Флавий и Аврелиан", 0),
		new Answer("Калигула и Траян", 0)
	]),
	new Question("Какое имя получила Восточная Римская империя после раздела?", 
	[
		new Answer('Византия', 1),
		new Answer("Константинополь", 0),
		new Answer("Восточная Империя Франков", 0),
		new Answer("нет ответа", 0)
	]),
	new Question("На каком полуострове находится страна Италия?", 
	[
		new Answer('Балканском', 0),
		new Answer("Пиренейском", 0),
		new Answer("Апеннинском", 1),
		new Answer("Малой Азия", 0)
	]),

	
];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}