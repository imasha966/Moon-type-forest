import { database } from "./firebase.js";
import { ref, set, onValue, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
let playerId="player_"+Date.now();let currentRoom="";let gameActive=false;let startTime;
document.getElementById("joinBtn").onclick=async()=>{
  const name=document.getElementById("fullName").value;const room=document.getElementById("roomCode").value.toUpperCase();
  if(!name||!room)return alert("Name & Room Code ඕන!");
  currentRoom=room;const snap=await get(ref(database,"rooms/"+room));
  if(!snap.exists())return alert("Room not found!");await set(ref(database,`players/${room}/${playerId}`),{name,school:document.getElementById("schoolName").value,category:document.getElementById("category").value,wpm:0});
  document.getElementById("joinScreen").style.display="none";document.getElementById("waitingScreen").style.display="block";document.getElementById("roomDisplay").innerText=room;
  onValue(ref(database,`rooms/${room}/status`),s=>{if(s.val()==="started")startGame(room)});
};
function startGame(room){document.getElementById("waitingScreen").style.display="none";document.getElementById("gameScreen").style.display="block";gameActive=true;startTime=Date.now();
  onValue(ref(database,`rooms/${room}/endTime`),snap=>{const end=snap.val();if(!end)return;const iv=setInterval(()=>{const left=Math.max(0,Math.floor((end-Date.now())/1000));document.getElementById("timer").innerText=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;if(left<=0){clearInterval(iv);finishGame()}},500)})}
document.getElementById("typeBox").addEventListener("input",e=>{if(!gameActive)return;const typed=e.target.value;const mins=(Date.now()-startTime)/60000;const wpm=Math.round((typed.length/5)/mins)||0;document.getElementById("wpm").innerText=wpm});
async function finishGame(){gameActive=false;const wpm=document.getElementById("wpm").innerText;await update(ref(database,`players/${currentRoom}/${playerId}`),{wpm:parseInt(wpm)});document.getElementById("gameScreen").style.display="none";document.getElementById("resultScreen").style.display="block";document.getElementById("finalWpm").innerText=wpm;
  onValue(ref(database,`players/${currentRoom}`),snap=>{const data=snap.val();if(!data)return;const sorted=Object.values(data).sort((a,b)=>b.wpm-a.wpm);document.getElementById("leaderboard").innerHTML=sorted.map((p,i)=>`${i+1}. ${p.name} - ${p.wpm} WPM`).join("<br>")})}