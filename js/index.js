const milestonesData = JSON.parse(data).data;

// Load cursor milestone data
function loadMilestones(){
    const milestones = document.querySelector(".milestones");
    milestones.innerHTML = `${milestonesData.map(function(milestone){
                return `<div class="milestone border-b" id="${milestone._id}">
                <div class="flex">
                  <div class="checkbox"><input type="checkbox" onclick= "markMilestone(this, ${milestone._id})" /></div>
                  <div onclick ="openMilestone(this, ${milestone._id})" >
                    <p>                 
                      ${milestone.name}
                      <span><i class="fas fa-chevron-down"></i></span>
                    </p>
                  </div>
                </div>
                <div class="hidden_panel">
                  ${milestone.modules.map(function(modules){
                    return `<div class="module border-b">
                    <p>${modules.name}</p>
                  </div>`; 
                  }).join("")}
                </div>
              </div>`
        }).join("")}`;
} 

function openMilestone (milestoneElement, id){
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active")

  if(active && !milestoneElement.classList.contains("active")){
    active.classList.remove("active");
  }

  milestoneElement.classList.toggle("active");

  if (!currentPanel.classList.contains("show") && shownPanel)
    shownPanel.classList.remove('show');
  
  
  currentPanel.classList.toggle('show');

  showMileston(id);
}


function showMileston(id){
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");


  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function (){
  this.style.opacity = "1";
}

function markMilestone(checkbox, id){
  const doneList = document.querySelector(".doneList");
  const milestoneList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if(checkbox.checked){
    milestoneList.removeChild(item);
    doneList.appendChild(item)
  } else{
    milestoneList.appendChild(item);
    doneList.removeChild(item)
  }
}

loadMilestones();