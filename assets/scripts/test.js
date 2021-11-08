border=true
document.querySelector(".hamburger-icon").addEventListener("click",()=>{
if(border){
document.querySelector(".rocket-svg").style.border=""
border=false

}
else{
document.querySelector(".rocket-svg").style.border="1px solid black"
border=true


}
})