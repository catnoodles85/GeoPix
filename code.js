// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Old code
/* 
function geoLocation(){
    let status = document.querySelector('#Status');
    let mapLink = document.querySelector('#Map-link');
    mapLink.href = "";
    mapLink.textContent = "";
    function success(position){
        const latitude = position.coords.latitude;
        const longitude =  position.coords.longitude;
        status.textContent = "";
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `latitude:${latitude}°, longitude:${longitude}°`;
        fetch("https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=00a31f12afffd2cff1ceeefd8cb8f3bb&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat="
        +latitude+"&lon="
        +longitude+"&text=cats")
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            let photoArray = data.photos.photo.map(photo => constructImageURL(photo))
            const main = document.querySelector('main')
            let imageDisplay = document.createElement("img");
            main.append(imageDisplay);
            imageDisplay.src = photoArray[0];
            let index = 0
            setInterval(() => {
                if(index >= photoArray.length -1){ // have to have a stoping point in the array using the array.length-one.
                    index = 0
                }else{
                    index +=1 
                }
                imageDisplay.src = photoArray[index]
            } , 2000)
        })
    }
    function error(){
        status.textContent = "Unable to retreive location: But Heres somewhere nice to go: latitude:48.858370°, longitude:2.294481° ";
    }
    if(!navigator.geolocation){
        status.textContent = `Geolocation is not supported`;
    }else{
        status.textContent = `Locating...`
    }
    navigator.geolocation.getCurrentPosition(success,error);
  
}
document.querySelector('#LocateMe').addEventListener("click", geoLocation);


function constructImageURL (photo) {
    return "https://farm" + photo.farm +
            ".staticflickr.com/" + photo.server +
            "/" + photo.id + "_" + photo.secret + ".jpg";

}

*/

//New code:
const flipBook = document.getElementById('flipBook')
const mainDiv = document.getElementById('main')
const submitBtn = document.getElementById('submit')
let photoArray
let input
const searchBar = document.getElementById('search-Bar')
let value = searchBar.value 

searchBar.addEventListener("keydown", (e) => {
    value = e.target.value
    input = value
    console.log(input)
})




function geoLocation(){
    let status = document.querySelector('#Status');
    let mapLink = document.querySelector('#Map-link');
    mapLink.href = "";
    mapLink.textContent = "";
    function success(position){
        let latitude = position.coords.latitude;
        let longitude =  position.coords.longitude;
        status.textContent = "";
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `latitude:${latitude}°, longitude:${longitude}°`;
    
        fetch("https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=00a31f12afffd2cff1ceeefd8cb8f3bb&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat="
        +latitude+"&lon="+longitude+"&text="+input)
        .then(response => response.json())
        .then((data) => {
        console.log(data)
        photoArray = data.photos.photo.map(photo => constructImageURL(photo))
        let imageDisplay = document.createElement("img");
        flipBook.append(imageDisplay);
        imageDisplay.src = photoArray[0];
        let index = 0
        setInterval(() => {
            if(index >= photoArray.length -1){ 
                index = 0
            }else{
                index +=1 
            }
            imageDisplay.src = photoArray[index]
        },2000)
        })
    }
    
    function error(){
        status.textContent = "Unable to retreive location: But Heres somewhere nice to go: latitude:48.858370°, longitude:2.294481° ";
    }
    if(!navigator.geolocation){
        status.textContent = `Geolocation is not supported`;
    }else{
        status.textContent = `Locating...`
    }
    navigator.geolocation.getCurrentPosition(success,error);

}

function constructImageURL (photo) {
return "https://farm" + photo.farm +
        ".staticflickr.com/" + photo.server +
        "/" + photo.id + "_" + photo.secret + ".jpg";
}

document.getElementById('submit').addEventListener('click', geoLocation);






    
    

    
