(() => {
"use strict";

const STATE_KEY = "NEXORA_FIXED_STATE";
const USERS_KEY = "NEXORA_FIXED_USERS";
const defaultState = {logged:false,name:"",email:"",branch:"",topics:[],projects:[],resumes:0};
let state = load(STATE_KEY, defaultState);

function load(key, fallback){
  try { return Object.assign({}, fallback, JSON.parse(localStorage.getItem(key) || "{}")); }
  catch(e){ return Object.assign({}, fallback); }
}
function save(){ localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
function $(id){ return document.getElementById(id); }
function esc(v){return String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function toast(msg){
  const el=$("toast"); el.textContent=msg; el.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

function openPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const page=$(id);
  if(!page){toast("Page not found");return;}
  page.classList.add("active");
  document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("selected",b.dataset.page===id));
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="dashboard") updateDashboard();
}

document.addEventListener("click",e=>{
  const btn=e.target.closest("[data-page]");
  if(btn){e.preventDefault();openPage(btn.dataset.page);}
});

function enter(name,email,branch){
  state={...state,logged:true,name:name||"Student",email:email||"",branch:branch||"Student"};
  save(); showApp(); openPage("home"); toast("Welcome to NEXORA!");
}
function showApp(){
  $("authScreen").classList.toggle("hidden",state.logged);
  $("app").classList.toggle("hidden",!state.logged);
  if(state.logged){fillResume();updateDashboard();}
}

$("switchAuth").onclick=()=>{
  const login=$("loginForm"), signup=$("signupForm");
  const isLogin=!login.classList.contains("hidden");
  login.classList.toggle("hidden",isLogin);
  signup.classList.toggle("hidden",!isLogin);
  $("authTitle").textContent=isLogin?"Create your account":"Welcome back";
  $("authSub").textContent=isLogin?"Start your learning workspace.":"Sign in to continue your saved progress.";
  $("switchText").textContent=isLogin?"Already have an account?":"New user?";
  $("switchAuth").textContent=isLogin?"Log in":"Create account";
};

$("signupForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("signupName").value.trim(), email=$("signupEmail").value.trim().toLowerCase(), pass=$("signupPassword").value, branch=$("signupBranch").value;
  if(pass.length<6)return toast("Password must be 6+ characters");
  const users=load(USERS_KEY,{});
  if(users[email])return toast("Account already exists. Log in.");
  users[email]={name,password:pass,branch};
  localStorage.setItem(USERS_KEY,JSON.stringify(users));
  enter(name,email,branch);
});

$("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("loginEmail").value.trim().toLowerCase(), pass=$("loginPassword").value;
  const users=load(USERS_KEY,{});
  if(!users[email])return toast("Account not found. Create an account first.");
  if(users[email].password!==pass)return toast("Incorrect password.");
  enter(users[email].name,email,users[email].branch);
});

$("demoLogin").onclick=()=>enter("Demo Student","demo@nexora.local","AI & Data Science");

$("logoutBtn").onclick=()=>{
  state.logged=false;save();showApp();toast("Logged out");
};
$("brandHome").onclick=()=>openPage("home");

$("generateLesson").onclick=()=>{
  const topic=$("topicInput").value.trim(), level=$("topicLevel").value;
  if(!topic)return toast("Please enter a topic.");
  if(!state.topics.includes(topic))state.topics.push(topic);
  save();updateDashboard();
  $("lessonOutput").innerHTML=`
  <div>
    <p class="eyebrow">${esc(level)} LESSON</p>
    <h2>${esc(topic)}</h2>
    <h3>What is ${esc(topic)}?</h3>
    <p>Start by learning the definition, purpose, terminology and the problem this topic solves.</p>
    <h3>⭐ Important part</h3>
    <div class="important"><b>Remember this:</b><br>${esc(topic)} should be understood through its definition, working process, examples, applications and limitations.</div>
    <h3>Core concepts</h3>
    <ul><li>Basic terminology and definitions</li><li>How the concept works step by step</li><li>Simple examples</li><li>Real-world applications</li><li>Advantages and limitations</li></ul>
    <h3>How to study it</h3>
    <ol><li>Understand the definition.</li><li>Learn the core concepts.</li><li>Write one example yourself.</li><li>Practice questions.</li><li>Revise the important points.</li></ol>
    <h3>Quick revision</h3>
    <p><b>${esc(topic)}</b> → Definition → Concepts → Example → Application → Practice → Revision.</p>
  </div>`;
  toast("Lesson generated.");
};

$("downloadLesson").onclick=()=>{
  const text=$("lessonOutput").innerText.trim();
  if(!text||text.includes("Your lesson will appear"))return toast("Generate a lesson first.");
  downloadFile("NEXORA_Notes.txt",text+"\\n\\nNEXORA");
};

$("generateProject").onclick=()=>{
  const idea=$("projectIdea").value.trim(),tech=$("projectTech").value,level=$("projectLevel").value;
  if(!idea)return toast("Please describe your project.");
  state.projects.unshift({title:idea,tech,level,date:new Date().toLocaleDateString()});
  save();updateDashboard();
  $("projectOutput").innerHTML=`
  <div>
    <p class="eyebrow">${esc(level)} PROJECT BLUEPRINT</p>
    <h2>${esc(idea)}</h2>
    <h3>1. Objective</h3><p>Define the target user, problem, inputs, outputs and the measurable result.</p>
    <h3>2. Main features</h3><ul><li>Responsive user interface</li><li>Input validation</li><li>Main project workflow</li><li>Data storage</li><li>Error handling</li><li>Testing</li></ul>
    <h3>3. Technology</h3><p>${esc(tech)}</p>
    <h3>4. Suggested file structure</h3>
    <div class="tree">project/
├── index.html
├── style.css
├── script.js
├── assets/
└── README.md</div>
    <h3>5. Development order</h3><ol><li>Plan screens and data.</li><li>Build the interface.</li><li>Implement the main feature.</li><li>Add validation and error handling.</li><li>Test edge cases.</li><li>Add backend/database if needed.</li><li>Deploy and document.</li></ol>
    <h3>6. Viva questions</h3><p>Why did you choose this technology? How is data stored? What was the main challenge? How did you test it? What can be improved?</p>
  </div>`;
  toast("Project plan created.");
};

function runCode(){
  $("codePreview").srcdoc=$("codeEditor").value;
  toast("Code executed.");
}
$("runCode").onclick=runCode;
$("clearOutput").onclick=()=>{$("codePreview").srcdoc="";toast("Output cleared.");};
runCode();

const resources=[
["MDN Web Docs","Official HTML, CSS, JavaScript and Web API documentation.","https://developer.mozilla.org/"],
["Python Docs","Official Python language documentation.","https://docs.python.org/3/"],
["freeCodeCamp","Free programming and web development courses.","https://www.freecodecamp.org/"],
["Khan Academy","Computer science and mathematics lessons.","https://www.khanacademy.org/computing"],
["GeeksforGeeks","Programming, DSA, DBMS, OS and interview practice.","https://www.geeksforgeeks.org/"],
["W3Schools","Beginner-friendly programming references and examples.","https://www.w3schools.com/"],
["NumPy","Official numerical computing documentation.","https://numpy.org/doc/"],
["Pandas","Official data analysis documentation.","https://pandas.pydata.org/docs/"],
["scikit-learn","Official machine-learning documentation.","https://scikit-learn.org/stable/"],
["React","Official React documentation.","https://react.dev/"],
["Node.js","Official Node.js documentation.","https://nodejs.org/docs/latest/api/"],
["FastAPI","Official FastAPI documentation.","https://fastapi.tiangolo.com/"]
];
$("resourceGrid").innerHTML=resources.map(r=>`<article class="resource"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p><a href="${r[2]}" target="_blank" rel="noopener">Open resource ↗</a></article>`).join("");

function fillResume(){
  $("resumeName").value=state.name||"";
  $("resumeEmail").value=state.email||"";
}
function makeResume(){
  const name=$("resumeName").value.trim()||"Your Name";
  return `<div><h1>${esc(name)}</h1><h2>${esc($("resumeTitle").value.trim()||"Student")}</h2>
  <p>${esc($("resumeEmail").value)} · ${esc($("resumePhone").value)}</p>
  <h3>PROFILE</h3><p>Motivated student focused on practical learning, projects and continuous improvement.</p>
  <h3>SKILLS</h3><p>${esc($("resumeSkills").value||"Add your skills")}</p>
  <h3>EDUCATION</h3><p>${esc($("resumeEducation").value||"Add your education")}</p>
  <h3>PROJECTS</h3><p>${esc($("resumeProjects").value||"Add your projects")}</p>
  <h3>EXPERIENCE & CERTIFICATIONS</h3><p>${esc($("resumeExperience").value||"Add your experience or certifications")}</p>
  <span class="watermark">Teju Gowda</span></div>`;
}
$("previewResume").onclick=()=>{$("resumePreview").innerHTML=makeResume();toast("Resume updated.");};
$("printResume").onclick=()=>{
  $("resumePreview").innerHTML=makeResume();state.resumes++;save();updateDashboard();
  const win=window.open("","_blank");
  if(!win)return toast("Allow pop-ups to print the resume.");
  win.document.write(`<html><head><title>NEXORA Resume</title><style>body{font-family:Arial;margin:45px}.paper{max-width:700px;margin:auto}h1{font-size:34px}h2{font-size:14px;color:#555}h3{font-size:12px;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:24px}p{font-size:11px;line-height:1.65}.watermark{position:fixed;right:18px;bottom:14px;font-size:8px;color:#777}</style></head><body><div class="paper">${makeResume()}</div></body></html>`);
  win.document.close();win.focus();setTimeout(()=>win.print(),400);
};

function downloadFile(name,text){
  const blob=new Blob([text],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function updateDashboard(){
  $("welcomeName").textContent=state.name||"Student";
  $("topicCount").textContent=state.topics.length;
  $("projectCount").textContent=state.projects.length;
  $("resumeCount").textContent=state.resumes;
  $("savedProjects").innerHTML=state.projects.length?state.projects.map((p,i)=>`<div class="saved"><div><b>${esc(p.title)}</b><br><small>${esc(p.tech)} · ${esc(p.level)} · ${esc(p.date)}</small></div><button class="delete" data-delete="${i}">Delete</button></div>`).join(""):"<p class='muted'>No projects saved yet.</p>";
}
$("savedProjects").onclick=e=>{
  const b=e.target.closest("[data-delete]");if(!b)return;
  state.projects.splice(Number(b.dataset.delete),1);save();updateDashboard();toast("Project deleted.");
};

$("profileBtn").onclick=()=>{
  $("profileName").value=state.name;$("profileBranch").value=state.branch;$("profileEmail").value=state.email;
  $("profileModal").classList.add("show");
};
$("closeProfile").onclick=()=>$("profileModal").classList.remove("show");
$("profileModal").onclick=e=>{if(e.target===$("profileModal"))$("profileModal").classList.remove("show")};
$("saveProfile").onclick=()=>{
  state.name=$("profileName").value.trim()||"Student";
  state.branch=$("profileBranch").value.trim();
  state.email=$("profileEmail").value.trim();
  save();fillResume();updateDashboard();$("profileModal").classList.remove("show");toast("Profile saved.");
};

showApp();
})();