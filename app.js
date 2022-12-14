const IMAGES = 82;

let actualImg = "0";
let imageApiUrl = "https://raw.githubusercontent.com/jgss-gabriel-sousa/bibi-image-api/main/img/"

function newImage(){
    loadImage();
    changeBackground();
}newImage();

function loadImage(value){
    let newImg;

    if(!value){
        do{
            newImg = rand(1, IMAGES).toString();
        }while(newImg == actualImg);
    }
    else newImg = value.toString();

    document.querySelector("img").src = imageApiUrl+"bibi ("+newImg+").jpg";
    actualImg = newImg;
}

async function downloadImage(){
    const imageSrc = imageApiUrl+"bibi ("+actualImg+").jpg";

    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = "Bibi"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function hoursBetweenDates(first, second){
    const msBetweenDates = Math.abs(first - second);
    return msBetweenDates / (60 * 60 * 1000);
}


function todayBibi(){
    let newImage = true;
    const last = new Date(localStorage.getItem("lastTodayBibi"));
    const now = new Date();

    if(localStorage.getItem("lastTodayBibi") != null){
        if(last.getDay() == now.getDay())
            newImage = false;
    }

    if(newImage){
        const timeNow = new Date();

        localStorage.setItem("lastTodayBibi",timeNow);
        
        let newImg;
        do{
            newImg = rand(1, IMAGES).toString();
        }while(newImg == localStorage.getItem("todayImg"));
        localStorage.setItem("todayImg",newImg);
    }
    loadImage(localStorage.getItem("todayImg"));
}todayBibi();