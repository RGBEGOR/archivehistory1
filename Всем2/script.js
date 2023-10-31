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
	new Question(" Эти племена являются древнегерманскими племенами, о которых впервые упоминает история еще в середине 3 века н. э.", 
	[
		new Answer('Французы', 0),
		new Answer("Франки ", 1),
		new Answer("Галлы", 0),
		new Answer("Вестготы", 0)
	]),
	new Question("Это  первая династия франкских королей, правившая с конца V до середины VIII века во Франкском государстве.", 
	[
		new Answer('Меровинги', 1),
		new Answer("Каролинги", 0),
		new Answer("Капетинги", 0),
		new Answer("Гогельцойлерны", 0)
	]),
	new Question("от лат....— благодеяние) — это: в раннем средневековье — земельное владение без права наследования, пожалованное феодалом своему вассалу за определенную службу, чаще всего с правом взимать повинности с крестьян ", 
	[
		new Answer('Что то там?', 0),
		new Answer("Феоды", 0),
		new Answer("Аллоды", 0),
		new Answer("Бенефиций", 1)
	]),
	new Question("Вошел в историю как освободитель Европы от вторжения арабов, защитник всей западной христианской цивилизации. Известность получил после победы над арабским войском в битве при Пуатье.", 
	[
		new Answer('Карл Лысый ', 0),
		new Answer("Карл Мартел", 1),
		new Answer("Карл Немец", 0),
		new Answer("Пипин Короткий", 0)
	]),
	new Question("Он стал одним из самых выдающихся королей Европы V-VI веков н.э второй из королей династии Меровингов", 
	[
		new Answer(' Хлодвиг-I ', 1),
		new Answer("Хлодвиг-III", 0),
		new Answer("Одакр", 0),
		new Answer("Карл мартел", 0)

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


