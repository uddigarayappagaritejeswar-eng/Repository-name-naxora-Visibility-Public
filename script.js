(()=>{"use strict";
const $=id=>document.getElementById(id),KEY="NEXORA_V5_STATE";
let state=JSON.parse(localStorage.getItem(KEY)||'{"logged":false,"name":"","email":"","quizzes":[]}');
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function showPage(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");scrollTo(0,0);if(id==="progress")renderProgress()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b){showPage(b.dataset.page)}});
document.querySelector(".home-link").onclick=()=>showPage("home");

$("loginForm").onsubmit=e=>{e.preventDefault();state.logged=true;state.email=$("loginEmail").value;state.name=state.email.split("@")[0]||"Student";save();init();toast("Account ready")};
$("demoLogin").onclick=()=>{state.logged=true;state.email="demo@nexora.local";state.name="Demo Student";save();init();toast("Demo account ready")};
$("logout").onclick=()=>{state.logged=false;save();init()};

function init(){$("authScreen").classList.toggle("hidden",!!state.logged);$("app").classList.toggle("hidden",!state.logged);if(state.logged)renderProgress()}
init();

/* A broad built-in question bank covering many languages.
   Questions are intentionally concise and deterministic so the site works offline. */
const BANK={
Python:[
["Which keyword defines a function?",["def","func","function","define"],0],
["Which type is mutable and ordered?",["tuple","list","set","frozenset"],1],
["Which symbol starts a comment?",["//","#","<!--","--"],1],
["Which operator tests equality?",["=","==","===","=>"],1],
["Which value means no value?",["null","None","void","empty"],1],
["Which function returns item count?",["count()","len()","size()","items()"],1],
["Which collection stores key-value pairs?",["list","tuple","dictionary","string"],2],
["Which keyword handles exceptions?",["try","catch","error","exceptonly"],0],
["Which statement imports a module?",["include","using","import","require"],2],
["Which function prints output?",["echo()","print()","write()","display()"],1]
],
JavaScript:[
["Which declares a block-scoped variable?",["var","let","define","value"],1],
["Which prints to the console?",["print()","console.log()","echo()","log()"],1],
["Which operator checks value and type?",["==","=","===","!="],2],
["Which keyword creates a constant?",["fixed","const","constant","static"],1],
["What does DOM mean?",["Document Object Model","Data Object Method","Digital Output Module","Document Order Map"],0],
["Which event fires on a button press?",["hover","click","load","focus"],1],
["Which method parses JSON text?",["JSON.parse()","JSON.object()","JSON.read()","JSON.decodeText()"],0],
["Which adds to an array's end?",["append()","add()","push()","insert()"],2],
["Which keyword defines a function?",["func","def","function","method"],2],
["Which value represents absence?",["undefined","zero","falseonly","blank"],0]
],
HTML:[
["HTML stands for?",["Hyper Text Markup Language","High Text Machine Language","Hyperlink Tool Markup Language","Home Text Markup Language"],0],
["Which tag creates a paragraph?",["<p>","<para>","<text>","<pg>"],0],
["Which tag creates a link?",["<link>","<a>","<url>","<href>"],1],
["Which tag displays an image?",["<image>","<img>","<pic>","<src>"],1],
["Which attribute provides image alternative text?",["src","alt","href","titleonly"],1],
["Largest standard heading?",["<h6>","<h1>","<head>","<heading>"],1],
["HTML mainly provides?",["Styling","Structure","Database storage","Compilation"],1],
["Which tag creates a line break?",["<break>","<br>","<lb>","<newline>"],1],
["HTML5 declaration?",["<html5>","<!DOCTYPE html>","<doctype5>","<html version=5>"],1],
["Which element is used for a form?",["<input>","<form>","<field>","<data>"],1]
],
CSS:[
["CSS stands for?",["Cascading Style Sheets","Computer Style System","Creative Sheet Syntax","Color Style Source"],0],
["Which property changes text color?",["font-color","text-color","color","foreground"],2],
["Which property sets background color?",["background-color","bg","back-color","color-bg"],0],
["Which symbol selects a class?",["#",".","@","*"],1],
["Which symbol selects an id?",["#",".","&","@"],0],
["Which layout system uses rows and columns?",["Float","Grid","Inline","Table-only"],1],
["Which property controls font size?",["text-size","font-size","size","font"],1],
["Which property creates rounded corners?",["corner","radius","border-radius","round"],2],
["Which property controls spacing inside an element?",["margin","padding","gap-only","inside-space"],1],
["Which unit is relative to root font size?",["px","rem","cm","pt"],1]
],
Java:[
["Which keyword defines a class?",["class","struct","type","object"],0],
["Which method starts a Java program?",["start()","main()","run()","init()"],1],
["Which type stores whole numbers?",["float","int","char","boolean"],1],
["Which keyword creates an object?",["make","new","create","object"],1],
["Java code normally runs on?",["JVM","DOM","CSS engine","SQL server"],0],
["Which symbol ends most statements?",[".",":",";","!"],2],
["Which keyword inherits a class?",["extends","inherits","using","base"],0],
["Which type stores true/false?",["bool","boolean","bit","logic"],1],
["Which access modifier is most restrictive?",["public","protected","private","open"],2],
["Which collection can store ordered objects?",["ArrayList","Thread","Scanner","System"],0]
],
C:[
["Which function is the common program entry point?",["start()","main()","run()","begin()"],1],
["Which header supports printf?",["<stdio.h>","<string.h>","<math.h>","<stdlib.hpp>"],0],
["Which symbol ends a statement?",[";",";",".",":"],0],
["Which operator gets an address?",["*","&","%","@"],1],
["Which type stores a character?",["char","text","character","string"],0],
["Which loop repeats while a condition is true?",["while","repeat","loopif","during"],0],
["Which function allocates memory dynamically?",["malloc","new","alloc","memory"],0],
["Which preprocessor symbol begins a directive?",["#","@","$","%"],0],
["Which format specifier is commonly used for int in printf?",["%s","%d","%f","%c"],1],
["C is primarily a?",["Markup language","General-purpose programming language","Database","Stylesheet"],1]
],
"C++":[
["Which feature supports classes and objects?",["OOP","HTML","DOM","SQL"],0],
["Which header is common for iostream?",["<iostream>","<stdio.h>","<input>","<stream.hpp>"],0],
["Which operator accesses a member through an object?",["->",".","::","=>"],1],
["Which keyword creates an object dynamically?",["new","make","alloc","create"],0],
["Which symbol begins a namespace scope?",["::","->",".","#"],0],
["Which is used for inheritance?",["extends",":","inherits","base"],1],
["Which function may have same name as class?",["Constructor","Destructor","Main","Getter"],0],
["Which symbol starts a single-line comment?",["#","//","--","<!--"],1],
["Which type can store true/false?",["bool","bit","logic","boolean"],0],
["Which is a C++ standard library container?",["vector","arraylist","dictionaryonly","listbox"],0]
],
"C#":[
["Which keyword defines a class?",["class","type","structonly","object"],0],
["Which platform commonly runs modern C#?",[".NET","JVM","Node-only","Django"],0],
["Which method is the common entry point?",["Main()","Start()","Run()","Begin()"],0],
["Which keyword creates an object?",["new","make","object","create"],0],
["Which type stores true/false?",["bool","boolean","logic","bit"],0],
["Which symbol starts a single-line comment?",["//","#","--","<!--"],0],
["Which keyword handles exceptions?",["try","except","rescue","error"],0],
["Which access modifier exposes a member broadly?",["public","private","hidden","internalonly"],0],
["Which collection is generic and dynamic?",["List<T>","FixedArray","MapOnly","TupleOnly"],0],
["C# is strongly associated with?",[".NET","PHP engine","JVM","Ruby VM"],0]
],
Go:[
["What keyword declares a function?",["func","def","function","fn"],0],
["Which package is commonly used for formatted I/O?",["fmt","ioformat","print","console"],0],
["Which function is the usual entry point?",["start","main","run","begin"],1],
["Which keyword declares a variable explicitly?",["var","let","dim","define"],0],
["Go uses what for concurrency?",["goroutines","threads-only","actors-only","fibers-only"],0],
["Which keyword starts a goroutine?",["go","async","spawn","parallel"],0],
["Which symbol starts a single-line comment?",["//","#","--","<!--"],0],
["Go is a?",["Compiled programming language","Markup language","Database","Stylesheet"],0],
["Which package handles HTTP server/client utilities?",["net/http","web","httpgo","server"],0],
["Which keyword defines a type?",["type","class","structonly","define"],0]
],
Rust:[
["Which keyword defines a function?",["fn","func","def","function"],0],
["Which keyword creates an immutable variable binding?",["let","constonly","var","fixed"],0],
["Which macro prints text?",["println!","print()","echo!","console!"],0],
["Rust is known for?",["Memory safety","Only web design","Database queries","Markup"],0],
["Which type is commonly used for UTF-8 text?",["String","Text","StrOnly","CharArray"],0],
["Which keyword defines a struct?",["struct","class","record","typeclass"],0],
["Which operator is used for mutable references?",["&mut","mut&","refmut","*mut"],0],
["Which package manager/build tool is standard?",["Cargo","RustPM","BuildR","CrateTool"],0],
["Rust source files usually use?",[".rs",".rust",".r",".rsx"],0],
["Which enum is commonly used for recoverable results?",["Result","OptionOnly","Either","Return"],0]
],
PHP:[
["PHP code is commonly embedded in?",["HTML","SQL only","CSS only","JSON only"],0],
["Which symbol starts a PHP variable?",["$","@","#","%"],0],
["Which tag starts PHP code?",["<?php","<php>","<?","<script php>"],0],
["Which function prints output?",["echo","printfOnly","show","display"],0],
["PHP is commonly used for?",["Server-side web development","Styling only","Database engine","Operating system"],0],
["Which operator concatenates strings in PHP?",[".","+","&","::"],0],
["Which keyword defines a function?",["function","def","func","fnonly"],0],
["Which structure stores key-value pairs?",["associative array","tuple","structonly","record"],0],
["Which statement includes another PHP file?",["include","import","requireonly","both include/require"],3],
["PHP files commonly use which extension?",[".php",".ph",".p",".web"],0]
],
SQL:[
["SQL is primarily used to?",["Query databases","Style pages","Compile apps","Draw graphics"],0],
["Which command retrieves rows?",["SELECT","GET","FETCHONLY","READ"],0],
["Which command adds rows?",["INSERT","ADD","PUT","APPEND"],0],
["Which command changes existing rows?",["UPDATE","CHANGE","EDIT","MODIFY"],0],
["Which command removes rows?",["DELETE","REMOVE","DROP ROWS","ERASE"],0],
["Which clause filters rows?",["WHERE","FILTER","IF","HAVINGONLY"],0],
["Which clause sorts results?",["ORDER BY","SORT","ARRANGE","GROUP SORT"],0],
["Which clause groups rows?",["GROUP BY","GROUP","CLUSTER","COLLECT"],0],
["Which keyword removes duplicate result rows?",["DISTINCT","UNIQUEONLY","DIFFERENT","DEDUP"],0],
["Which command creates a table?",["CREATE TABLE","NEW TABLE","MAKE TABLE","TABLE CREATE"],0]
],
Swift:[
["Which keyword declares a variable?",["var","letonly","define","value"],0],
["Which keyword declares a constant?",["let","const","fixed","constant"],0],
["Swift is developed by?",["Apple","Google","Microsoft","Mozilla"],0],
["Which symbol starts a single-line comment?",["//","#","--","<!--"],0],
["Which keyword defines a function?",["func","function","def","fn"],0],
["Which type represents text?",["String","Text","CharSequence","TextType"],0],
["Which collection stores ordered values?",["Array","DictionaryOnly","SetOnly","ListOnly"],0],
["Which collection stores key-value pairs?",["Dictionary","MapOnly","ObjectOnly","Pairs"],0],
["Which keyword defines a class?",["class","type","object","structonly"],0],
["Swift is primarily used for?",["Apple platform development","SQL queries","Web styling","Database administration"],0]
],
Kotlin:[
["Which keyword declares a variable?",["val","var","let","define"],1],
["Which keyword declares an immutable value?",["val","const","fixed","let"],0],
["Which function is a common entry point?",["main","start","run","begin"],0],
["Kotlin runs on which virtual machine commonly?",["JVM","DOM","CLR-only","V8-only"],0],
["Which keyword defines a function?",["fun","func","def","function"],0],
["Which type represents true/false?",["Boolean","bool","logic","Bit"],0],
["Which symbol starts a single-line comment?",["//","#","--","<!--"],0],
["Which collection is commonly immutable by default?",["List","MutableList","ArrayListOnly","Vector"],0],
["Which keyword creates a class?",["class","type","objectonly","record"],0],
["Kotlin is commonly used for?",["Android development","SQL only","CSS only","C compiler"],0]
],
TypeScript:[
["TypeScript is a superset of?",["JavaScript","Java","C++","Python"],0],
["Which keyword defines an interface?",["interface","contract","typeonly","protocol"],0],
["Which extension is commonly used?",[".ts",".tsxonly",".type",".typescript"],0],
["Which command compiles TypeScript?",["tsc","tscompile","typec","compilets"],0],
["Which type is used for text?",["string","text","StringOnly","char"],0],
["TypeScript adds what to JavaScript?",["Static typing features","Database tables","HTML tags","CSS rules"],0],
["Which symbol starts a single-line comment?",["//","#","--","<!--"],0],
["Which keyword declares a variable?",["let","varonly","define","dim"],0],
["Which type represents true/false?",["boolean","boolonly","logic","bit"],0],
["TypeScript can compile to?",["JavaScript","Java bytecode","CIL only","Python"],0]
],
Ruby:[
["Which method prints output?",["puts","printline","echo","show"],0],
["Which symbol starts an instance variable?",["@","$","#","%"],0],
["Ruby files commonly use?",[".rb",".ruby",".rby",".rub"],0],
["Which keyword defines a method?",["def","func","function","method"],0],
["Ruby is known as?",["Dynamic programming language","Markup language","Database","Stylesheet"],0],
["Which keyword begins a class?",["class","type","object","struct"],0],
["Which collection stores key-value pairs?",["Hash","DictOnly","MapOnly","Record"],0],
["Which loop keyword is common for iterating?",["each","foreachonly","iterate","loop"],0],
["Which symbol starts a comment?",["#","//","--","<!--"],0],
["Ruby is often associated with?",["Ruby on Rails","Spring","Django","ASP.NET"],0]
],
R:[
["R is widely used for?",["Statistics and data analysis","Web styling","Operating systems","Markup only"],0],
["Which assignment operator is common in R?",["<-","=>","==","::"],0],
["Which function displays values?",["print()","show()","display()","echo()"],0],
["Which data structure is a common atomic collection?",["vector","classonly","hashonly","pointer"],0],
["R scripts commonly use?",[".R",".rscript",".data",".rs"],0],
["Which function creates a sequence?",["seq()","rangeOnly()","sequenceOnly()","makeSeq()"],0],
["Which function combines values?",["c()","combine()","join()","appendOnly()"],0],
["R is popular in?",["Statistical computing","CSS design","Mobile UI only","Database engines"],0],
["Which symbol starts a comment?",["#","//","--","<!--"],0],
["Which function reads a CSV?",["read.csv()","csv.read()","loadcsv()","open.csv()"],0]
],
Dart:[
["Dart is used heavily with?",["Flutter","Spring","Rails","Django"],0],
["Which keyword declares a variable?",["var","let","define","dim"],0],
["Which keyword defines a function?",["void","func","def","function"],0],
["Which type stores text?",["String","Text","CharSequence","str"],0],
["Which symbol starts a single-line comment?",["//","#","--","<!--"],0],
["Dart files commonly use?",[".dart",".dt",".flutter",".drt"],0],
["Which keyword defines a class?",["class","type","object","record"],0],
["Which value represents absence?",["null","None","nilonly","empty"],0],
["Which collection stores ordered values?",["List","Tuple","SequenceOnly","VectorOnly"],0],
["Dart is a?",["Programming language","Stylesheet","Database","Markup language"],0]
]
};

function questionsFor(lang,n){
  const arr=BANK[lang]||[];
  if(arr.length>=n)return shuffle(arr).slice(0,n);
  const generic=[
    ["What is a good programming practice?",["Testing and clear code","Never testing","Ignoring errors","Copying without understanding"],0],
    ["What is debugging?",["Finding and fixing problems","Designing only","Deleting files","Changing hardware"],0],
    ["Why use version control?",["Track code changes","Increase screen size","Replace testing","Compile every language"],0],
    ["What is an algorithm?",["A step-by-step procedure","A color scheme","A database row","A file extension"],0],
    ["Why are comments useful?",["Explain code intent","Make code run faster always","Replace code","Store passwords"],0],
    ["What is a variable?",["A named value/reference","A browser tab","A compiler","A network cable"],0],
    ["What is testing?",["Checking expected behavior","Removing documentation","Skipping bugs","Changing syntax randomly"],0],
    ["What is documentation?",["Information about how something works","A password","A compiler","A screenshot only"],0],
    ["What is an API?",["An interface for software communication","A keyboard","A database file","A CSS selector"],0],
    ["What is source code?",["Human-readable program instructions","A screenshot","A CPU chip","A database password"],0]
  ];
  return shuffle(arr.concat(generic)).slice(0,n);
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}

let quiz=null;
$("startQuiz").onclick=()=>{
  const lang=$("quizLanguage").value,n=+$("quizCount").value;
  quiz={lang,qs:questionsFor(lang,n),answers:Array(n).fill(null)};
  $("quizSetup").classList.add("hidden");$("quizBox").classList.remove("hidden");renderQuiz();toast("Quiz started");
};
function renderQuiz(){
  $("quizBox").innerHTML=`<small>${esc(quiz.lang.toUpperCase())} • QUIZ</small>`+
    quiz.qs.map((q,i)=>`<div class="question"><h3>${i+1}. ${esc(q[0])}</h3>`+
    q[1].map((o,j)=>`<button class="option ${quiz.answers[i]===j?"selected":""}" data-q="${i}" data-a="${j}">${esc(o)}</button>`).join("")+
    `</div>`).join("")+`<button id="submitQuiz" class="primary full">Submit & Get Grade</button>`;
  document.querySelectorAll(".option").forEach(b=>b.onclick=()=>{quiz.answers[+b.dataset.q]=+b.dataset.a;renderQuiz()});
  $("submitQuiz").onclick=finishQuiz;
}
function finishQuiz(){
  const correct=quiz.qs.reduce((s,q,i)=>s+(quiz.answers[i]===q[2]?1:0),0);
  const pct=Math.round(correct/quiz.qs.length*100);
  const grade=pct>=90?"A+":pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=50?"D":"F";
  const result={language:quiz.lang,correct,total:quiz.qs.length,pct,grade,date:new Date().toLocaleString()};
  state.quizzes.unshift(result);save();
  $("quizBox").innerHTML=`<div class="result"><small>QUIZ RESULT</small><div class="score">${correct}/${quiz.qs.length}</div><h2>${pct}%</h2><div class="grade">Grade: ${grade}</div>
  <div class="review"><h3>Answer Review</h3>${quiz.qs.map((q,i)=>`<div class="review-row"><b>${i+1}. ${esc(q[0])}</b><br>Your answer: ${esc(q[1][quiz.answers[i]]??"Not answered")}<br>Correct answer: <strong>${esc(q[1][q[2]])}</strong></div>`).join("")}</div>
  <button id="another" class="primary full">Take Another Quiz</button></div>`;
  $("another").onclick=()=>{$("quizSetup").classList.remove("hidden");$("quizBox").classList.add("hidden")};
  renderProgress();toast("Quiz graded");
}

function renderProgress(){
  const qs=state.quizzes||[];$("statQuizzes").textContent=qs.length;
  const avg=qs.length?Math.round(qs.reduce((a,x)=>a+x.pct,0)/qs.length):0;$("statAverage").textContent=avg+"%";
  $("statBest").textContent=qs.length?qs.reduce((a,x)=>x.pct>a.pct?x:a).grade:"—";
  $("history").innerHTML=qs.length?qs.map(x=>`<div class="history-row"><span><b>${esc(x.language)}</b><br><small>${esc(x.date)} • ${x.correct}/${x.total}</small></span><span><b>${x.pct}%</b> <span class="grade-chip">${x.grade}</span></span></div>`).join(""):"<p>No quiz attempts yet. Take your first quiz.</p>";
}

/* Learning */
$("generateLesson").onclick=()=>{
  const lang=$("learnLanguage").value,topic=$("learnTopic").value.trim()||"fundamentals";
  $("lesson").innerHTML=`<small>${esc(lang.toUpperCase())} • LESSON</small><h2>${esc(topic)}</h2>
  <h3>What is ${esc(topic)} in ${esc(lang)}?</h3><p>Start by understanding the definition, purpose, syntax, how it works and where it is used. Then practice a small example and test yourself.</p>
  <h3>⭐ Important part</h3><div class="important">Remember the core syntax, data flow, common errors and one practical example. These are the parts to revise before a quiz or exam.</div>
  <h3>Study order</h3><ol><li>Definition and terminology</li><li>Syntax and rules</li><li>Simple example</li><li>Real-world use</li><li>Common mistakes</li><li>Practice questions</li></ol>
  <h3>Revision checklist</h3><ul><li>Can you explain it without notes?</li><li>Can you write a small example?</li><li>Can you find and fix an error?</li><li>Can you answer quiz questions about it?</li></ul>`;
};

/* Project Builder */
$("buildProject").onclick=()=>{
  const idea=$("projectIdea").value.trim();if(!idea)return toast("Enter a project idea");
  $("projectOutput").innerHTML=`<small>PROJECT BLUEPRINT</small><h2>${esc(idea)}</h2>
  <h3>1. Problem</h3><p>Define the user problem, target users, inputs, outputs and measurable success criteria.</p>
  <h3>2. Core features</h3><ul><li>User interface</li><li>Authentication where needed</li><li>Main workflow</li><li>Validation and error handling</li><li>Data storage</li><li>Testing</li></ul>
  <h3>3. Recommended stack</h3><p>Frontend: HTML, CSS, JavaScript. Add a backend/database only when the project needs secure accounts or cloud data.</p>
  <h3>4. Build order</h3><ol><li>Plan requirements</li><li>Create UI</li><li>Implement core logic</li><li>Add storage/API</li><li>Test edge cases</li><li>Deploy</li></ol>
  <h3>5. Portfolio value</h3><p>Add screenshots, a README, feature list, technology list, live demo and lessons learned.</p>`;
};

/* Browser code lab */
$("runCode").onclick=()=>{$("preview").srcdoc=$("codeEditor").value;toast("Code executed")};
$("runCode").click();

/* Resume */
function updateResume(){
  const name=$("rName").value||"Your Name";
  $("resumePaper").innerHTML=`<h1>${esc(name)}</h1><h2>${esc($("rTitle").value||"Student / Developer")}</h2><p>${esc($("rEmail").value)} • ${esc($("rPhone").value)}</p>
  <h3>SKILLS</h3><p>${esc($("rSkills").value)}</p><h3>EDUCATION</h3><p>${esc($("rEducation").value)}</p>
  <h3>PROJECTS</h3><p>${esc($("rProjects").value)}</p><h3>EXPERIENCE & CERTIFICATIONS</h3><p>${esc($("rExperience").value)}</p>
  <div class="watermark">Teju Gowda</div>`;
}
$("updateResume").onclick=updateResume;
$("printResume").onclick=()=>{updateResume();const w=open("","_blank");if(!w)return toast("Allow pop-ups");w.document.write(`<html><head><title>Resume</title></head><body style="font-family:Arial;margin:45px">${$("resumePaper").innerHTML}</body></html>`);w.document.close();setTimeout(()=>w.print(),300)};
})();