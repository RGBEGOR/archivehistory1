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
	new Result("Ну это прям позор", 0),
	new Result("Ну уже неплохо", 3),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Поздравляем Вы успешно усвоили эту тему", 5)
];

const questions = 
[
	new Question(" Эта империя существовала  с 962 по 1806 год и называлась?.", 
	[
		new Answer('Франция', 0),
		new Answer("Священная Римская Империя ", 1),
		new Answer("Римская империя", 0),
		new Answer("Италия", 0)
	]),
	new Question("Кто стал первым знатным правителем Священной Римской империи германской нации?", 
	[
		new Answer('Отто-I', 1),
		new Answer("Фридрих Карл", 0),
		new Answer("Карл Мартел", 0),
		new Answer("Людвиг благочестивый ", 0)
	]),
	new Question(" Этот термин «князь»;  от лат. princeps elector imperii — в Священной Римской империи — имперский князь, за которым с XIII века было закреплено право избрания императора (короля)", 
	[
		new Answer('Бургер', 0),
		new Answer("Гамбургер", 0),
		new Answer("Штауфен", 0),
		new Answer("Курфюрст", 1)
	]),
	new Question("Эта дата считается датой основания германского королевства. ", 
	[
		new Answer('980 год ', 0),
		new Answer("919 год", 1),
		new Answer("1050 год", 0),
		new Answer("843 год", 0)
	]),
	new Question("Оттон I - с ... г. провозгласил Германию Священной Римской империей, т.к. в ее состав входила северная Италия.", 
	[
		new Answer('962 года ', 1),
		new Answer("1800 года", 0),
		new Answer("843 года", 0),
		new Answer("919 года", 0)

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


