let allIssues =[];

async function loadIssues(){

    const res = await 
 fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")


    const data = await res.json()

    allIssues=data.data      ;
    displayIssues(allIssues)

}

function displayIssues(issues){
    const container=document.getElementById("cardContainer")
    container.innerHTML=""

const countNmber=document.getElementById("counter");
countNmber.textContent=issues.length  + " Issues"


    issues.forEach(issue => {


let priorityClass =""
if(issue.priority==="high"){
    priorityClass="text-red-600 bg-red-100"
} else if(issue.priority==="medium"){
    priorityClass="text-yellow-600 bg-yellow-100"
}else {
    priorityClass="text-gray-600 bg-gray-100"
}



const statusIcon = issue.status==="open"
? "../assets/Open-status.png" :"../assets/Closed- Status .png";


const topColor = issue.status==="open"
 ? "border-t-5  border-t-green-500" : "border-t-5  border-t-red-500";




let labelsHTML="";
if(issue.labels && issue.labels.length>0){
    labelsHTML=issue.labels.slice(0,2)
    .map(label=> {

        let labelClass="";
        if(label.toLowerCase()==="bug")labelClass="text-red-600 bg-red-100 ";
        else if(label.toLowerCase()==="help wanted")labelClass="text-yellow-600 bg-yellow-100";

   else if(label.toLowerCase()==="enhancement")labelClass="text-green-600 bg-green-100";

   if(!labelClass) return""
   return `<button class="px-5 py-2 mr-3 text-[14px] rounded-md ${labelClass}">${label}</button>`;
    }).join("");


    }





const card = document.createElement("div")



card.className=`p-5 mt-[20px]   border border-white rounded-lg  bg-white shadow-xl ${topColor}`

card.innerHTML=`

<div class="flex justify-between items-center">
<img class="w-6 h-6" src="${statusIcon}">   

<button class ="px-6 py-3 text-[15px] rounded ${priorityClass}">
${issue.priority}
</button>
</div>


<h2 class="text-xl  mb-1 font-bold ">${issue.title}</h2>


<p   class="text-gray-700 opacity-55 mb-2">${issue.description}</p>


<div class="flex flex-wrap mb-3">
${labelsHTML}
</div>

<hr class="mb-3  border-gray-300 ">

<div class="flex  text-xs text-gray-500">
<span>${issue.id}by</span>
<span>${issue.author}</span>
</div>

<div class="text-gray-500 text-xs"> ${issue.createdAt}</div>


` ;


// modal

card.addEventListener("click" , () =>{

document.getElementById("modalTitle").textContent=issue.title;

document.getElementById("modalDescription").textContent=issue.description;

const statBtn = document.getElementById("modalStatus");
statBtn.textContent = issue.status.toUpperCase();
if(issue.status === "open"){
    statBtn.className="px-4 py-2 rounded font semi-bold text-white bg-green-600";

}else {
    statBtn.className ="px-4 py-2 rounded font semi-bold text-white bg-red-500"
}

  const updatedDate = new Date(issue.updatedAt || issue.createdAt).toLocaleDateString();

 document.getElementById("assigneeHere").textContent = `opened by ${issue.assignee || issue.author} • ${updatedDate}`;



   const labelsContainer = document.getElementById("modalLabels");
  labelsContainer.innerHTML = "";
  if(issue.labels && issue.labels.length > 0) {
    issue.labels.slice(0,5).forEach(label => {
      let labelClass = "";
      if(label.toLowerCase() === "bug") labelClass = "text-red-700 bg-red-100";
      else if(label.toLowerCase() === "help wanted") labelClass = "text-yellow-700 bg-yellow-100";
      else if(label.toLowerCase() === "enhancement") labelClass = "text-green-700 bg-green-100";
      const btn = document.createElement("button");
      btn.className = `px-3 py-1 text-xs rounded-md ${labelClass}`;
      btn.textContent = label;
      labelsContainer.appendChild(btn);
    });
  }

  
  document.getElementById("modalAssignee").textContent = issue.assignee || "Unassigned";

    const priorityBtn = document.getElementById("modalPriority");
  priorityBtn.textContent = issue.priority;

    if(issue.priority === "high") priorityBtn.className = "px-3 py-1 text-xs rounded font-semibold bg-red-100 text-red-600";
  else if(issue.priority === "medium") priorityBtn.className = "px-3 py-1 text-xs rounded font-semibold bg-yellow-100 text-yellow-600";
  else priorityBtn.className = "px-3 py-1 text-xs rounded font-semibold bg-gray-100 text-gray-600";


  document.getElementById("surprise").classList.remove("hidden");
  document.body.classList.add("bg-blue-50");  


})



container.appendChild(card);



    });
}

document.getElementById('allBtn').addEventListener("click", ()=>{

    displayIssues(allIssues)

})


function setTab (clickedBtn){
    const buttons=document.querySelectorAll(".tibet")
    buttons.forEach(btn=>{
        btn.classList.remove("bg-blue-500","text-white")

    })
    clickedBtn.classList.add("bg-blue-500","text-white")
}




document.getElementById("openBtn").addEventListener("click",function(){

    setTab(this);

const openIssues =allIssues.filter(issue => issue.status==="open");
displayIssues(openIssues)

})


document.getElementById("closeBtn").addEventListener("click",function() {

setTab(this);

const closeIssues =allIssues.filter(issue => issue.status==="closed");
displayIssues(closeIssues)

})

document.getElementById("allBtn").addEventListener("click",function() {

setTab(this);

displayIssues(allIssues)

})

loadIssues()
setTab(document.getElementById("allBtn"));

document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("surprise").classList.add("hidden");
  document.body.classList.remove("bg-blue-50"); 
});



const searchInput = document.getElementById("searchInput")

searchInput.addEventListener("input", function () {

  const searchText = searchInput.value.toLowerCase();

  const issues = document.querySelectorAll(".issue-card");

  issues.forEach(issue => {

    const title = issue.querySelector(".issue-title").textContent.toLowerCase();

    if (title.includes(searchText)) {
      issue.style.display = "block"
    } else {
      issue.style.display = "none"
    }

  });

});