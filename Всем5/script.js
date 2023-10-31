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
	new Question(" Они - собирательное название представителей нескольких германских племен: англов, саксов и ютов, захвативших остров Британия в начале V века", 
	[
		new Answer('Французы', 0),
		new Answer("Англосаксы ", 1),
		new Answer("Кельты", 0),
		new Answer("Скандинавы", 0)
	]),
	new Question("Кореной народ в переводе пёстрый, разный;  кельтские племена, составлявшие основное население Британии с VIII века до н. э. по V век н. э.", 
	[
		new Answer('Бритты', 1),
		new Answer("Пикты", 0),
		new Answer("Ирландцы", 0),
		new Answer("Римляне", 0)
	]),
	new Question("Это норманнские народы, морские разбойники, выходцы из Скандинавии, совершавшие в 9–11 вв. походы протяженностью до 8000 км", 
	[
		new Answer('Англосаксы', 0),
		new Answer("Бретонцы", 0),
		new Answer("Галлы", 0),
		new Answer("Викинги", 1)
	]),
	new Question("Согласно легендам, правитель королевства Логрес, легендарный вождь бриттов 5-6 веков, разгромивший завоевателей-саксов.", 
	[
		new Answer('Карл первый ', 0),
		new Answer("Артур", 1),
		new Answer("Экберт", 0),
		new Answer("Вильгельм первый", 0)
	]),
	new Question("Он носил титул Благочестивый, был очень образованным человеком, который покровительствовал науке и просвещению в Англии.  ", 
	[
		new Answer(' Альфред - Благочестивый ', 1),
		new Answer("Вильгельм", 0),
		new Answer("Генрих", 0),
		new Answer("Карл", 0)

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


