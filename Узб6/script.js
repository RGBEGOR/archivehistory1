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
	new Question(" «обитатель пустыни (степи)», «кочевник», от арабского бадия (بَادِية) — пустыня — термином принято обозначать ", 
	[
		new Answer('Степники ', 0),
		new Answer("Бедуины ", 1),
		new Answer("Берберы", 0),
		new Answer("Арабы", 0)
	]),
	new Question("Это букв. «переселение» — переселение мусульманской общины под руководством пророка Мухаммада из Мекки в Медину, произошедшее в 622 году. ", 
	[
		new Answer('Хиджра', 1),
		new Answer("Альгамбра", 0),
		new Answer("Мекка", 0),
		new Answer("Кааба", 0)
	]),
	new Question(" мусульманская святыня в виде кубической постройки во внутреннем дворе мечети аль-Харам (Заповедная мечеть) в Мекке. ", 
	[
		new Answer('Мечеть Аль-Гамбра', 0),
		new Answer("Бурж-Халифа", 0),
		new Answer("Мединна", 0),
		new Answer("Кааба", 1)
	]),
	new Question("От арабского — «покорность», «подчинение воле Бога») сформиро- вался в начале VII века на Аравийском полуострове", 
	[
		new Answer('Мусульмане ', 0),
		new Answer("Ислам", 1),
		new Answer("Коран", 0),
		new Answer("Хиджра", 0)
	]),
	new Question("Он начал утверждать, что нет божества кроме могучего единственного Бога – Всевышнего Аллаха, а себя объявил «посланником Аллаха, пророком».", 
	[
		new Answer('Мухаммед', 1),
		new Answer("Салахадин", 0),
		new Answer("Аль Худейда", 0),
		new Answer("Пророк Заратуштра", 0)

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


