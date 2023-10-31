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
	new Result("Вы уже неплохо разбираетесь", 3),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Поздравляем Вы успешно усвоили эту тему", 5)
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


	new Question(" Название территории буквально «заречье» или междуречье» (араб.), историческая область между реками Сырдарья и Амударья", 
	[
		new Answer('Туран ', 0),
		new Answer("Хорасан ", 0),
		new Answer("Бактрия ", 0),
		new Answer("Мавераннахр", 1)
	]),
	new Question("сельский правитель) – в раннем средневековье класс собственников до XI века", 
	[
		new Answer('Дехканин', 1),
		new Answer("Кашоварз", 0),
		new Answer("Кадивар", 0),
		new Answer("Чокар", 0)
	]),
	new Question("Священная книга Зороастрийцев", 
	[
		new Answer('Книга мертвых', 0),
		new Answer("Тора ", 0),
		new Answer("Библия ", 0),
		new Answer("Авеста", 1)
	]),
	new Question(" этот — учёный IX века математик, астроном, историк и географ. Являлся главой «Дома мудрости»", 
	[
		new Answer('Аль-Фергани', 0),
		new Answer("Аль-Хорезми", 1),
		new Answer("Аль-Термези", 0),
		new Answer("Ибн Сина", 0)
	]),
	new Question(" упоминаемый в Авесте и среднеиранской литературе исторический регион в Центральной Азии, населённый в древности скифскими иранскими племенами с общим названием. ", 
	[
		new Answer('Туран ', 1),
		new Answer("Буран", 0),
		new Answer("Уран", 0),
		new Answer("Согдиана", 0)

	]),


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

	new Question(" Правителем этих народов  был Грумбат, а страна  по версии историков просуществовало 120 лет. ", 
	[
		new Answer('Эфталиты', 0),
		new Answer("Тюрки", 0),
		new Answer("Кидариты", 0),
		new Answer("Хиониты", 1)
	]),
	new Question("это религиозное учение,по предположению проповедником Заратуштрой распространившееся в 1-м тысячелетии до н. э. ", 
	[
		new Answer('Зороастризм', 1),
		new Answer("Анимизм", 0),
		new Answer("Манихейство", 0),
		new Answer("Конфуцианство", 0)
	]),
	new Question("В V-VI вв. - в Туране правили  эти народы .Основатель государства - Вахшунвар .Занятие этих народов - земледелие, садоводство и животноводство.", 
	[
		new Answer('Жужане', 0),
		new Answer("Хиониты ", 0),
		new Answer("Кидариты ", 0),
		new Answer("Эфталиты", 1)
	]),
	new Question(" Они были потомками кушан. Их также называют ... , потому что их возглавлял вождь по имени Кидара.", 
	[
		new Answer('Кидалы', 0),
		new Answer("Кидариты", 1),
		new Answer("Кушаны", 0),
		new Answer("Сасаниды", 0)
	]),
	new Question("Первые столицы Эфталитов  - города ...", 
	[
		new Answer('Пайкенд и Варахша, ', 1),
		new Answer("Самарканд и Варахша,", 0),
		new Answer("Батрия и Согдина", 0),
		new Answer("Хорасан и Мавераннахр", 0)

	]),

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

	new Question(" В 395 году сыновья императора Феодосия разделили Римскую империю на ...", 
	[
		new Answer('Восточную и Северную ', 0),
		new Answer("Восточную и Западную ", 1),
		new Answer("Западную и Южную", 0),
		new Answer("Восточную и Дальневосточную", 0)
	]),
	new Question("Город Стамбул это на самом деле греческий город...", 
	[
		new Answer('Контсантинополь', 1),
		new Answer("Адрианополь", 0),
		new Answer("Никомедия", 0),
		new Answer("Рим", 0)
	]),
	new Question("-  это титул правителя Византии", 
	[
		new Answer('Император', 0),
		new Answer("Царь", 0),
		new Answer("Василек", 0),
		new Answer("Василевс", 1)
	]),
	new Question("При этом правителе Византия достигает наивысшего расцвета «Золотой век Византии»", 
	[
		new Answer('Константин ', 0),
		new Answer("Юстиниан I", 1),
		new Answer("София", 0),
		new Answer("Ромул", 0)
	]),
	new Question("Основная религия Византийцев", 
	[
		new Answer('Провославное христианство', 1),
		new Answer("Католичество", 0),
		new Answer("Ислам", 0),
		new Answer("Безбожники", 0)

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



new Swiper('.swiper', {

    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      scrollbar: {
        el: '.swiper-scrollbar',
      },
});