const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const logoSpans = document.querySelectorAll(".logo span");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{
    constructor(){
        this.reset();
    }

    reset(){
        this.x = Math.random()*canvas.width;
        this.y = canvas.height + Math.random()*200;
        this.size = Math.random()*3+1;
        this.speedY = Math.random()*2+0.5;
        this.speedX = Math.random()*1-0.5;
        this.opacity = Math.random();
    }

    update(){
        this.y -= this.speedY;
        this.x += this.speedX;

        
        let logoRect = document.querySelector(".logo").getBoundingClientRect();
        if(this.x > logoRect.left && this.x < logoRect.right &&
           this.y > logoRect.top && this.y < logoRect.bottom){
            let letterWidth = logoRect.width / logoSpans.length;
            let index = Math.floor((this.x - logoRect.left)/letterWidth);
            if(index>=0 && index<logoSpans.length){
                if(!logoSpans[index].classList.contains("extinguished")){
                    logoSpans[index].classList.add("extinguished");
                    setTimeout(()=>{
                        logoSpans[index].classList.remove("extinguished");
                    }, 400 + Math.random()*400); 
                }
            }
        }

        if(this.y < 0){
            this.y = canvas.height;
            this.x = Math.random()*canvas.width;
        }
    }

    draw(){
        ctx.fillStyle = "rgba(255,150,50,"+this.opacity+")";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

for(let i=0;i<200;i++){
    particles.push(new Particle());
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});