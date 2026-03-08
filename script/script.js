document.getElementById("login-btn").addEventListener("click",function(){

    const userName=document.getElementById("userNaam");
        const userId=userName.value ;

 const userPassword=document.getElementById("userPass")
 const userPasses = userPassword.value;

if(userId=="admin"  && userPasses=="admin123"){
    alert("login success")
    window.location.assign("/main.html")
} else{
    alert("try again, info is not valid!!")
    return;
}

});