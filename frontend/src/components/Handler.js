



const userId = document.getElementById("user-id").innerHTML

const didUserLikeDislikeTweet = (tweetLike)=>{
    var color = {"like":"", "dislike":""}
    for (let i = 0; i < tweetLike.length; i++) {
        if (userId == tweetLike[i].like_by || userId == tweetLike[i].like_by){

            if (tweetLike[i].like == true){
                color= {...color, like:"blue"}
            }
        }
    }
    return color;
    
    
}

const timeDelta = (data) =>{
    let timePass
    var t = data.split(/[- :]/);
    //We have the t[1]-1 for the months because the in js we have (0-11) months and not (1-12) as we used to.
    let timePassSecond = (new Date() - new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]))/1000
    
    if((timePassSecond) < 59){
        // second
        return ("" + Math.floor(timePassSecond) +"sec")
    }else if((timePassSecond/(60)) < 59){
        // Minute
        return ("" + Math.floor(timePassSecond/(60)) + " min")
    }else if(timePassSecond/(60*60) < 59){
        // Hour(s)
        return ("" + Math.floor(timePassSecond/(60*60)) + "h")
    }else if(timePassSecond/(60*60*24)< 30){
        //Day(s)
        return ("" + Math.floor(timePassSecond/(60*60*24)) + "d")
    }else if(timePassSecond/(60*60*24*30) < 12){
        //Month(s)
        return ("" + Math.floor(timePassSecond/(60*60*24*30)) + "mo")
    }else{
        //Year(s)
        return ("" + Math.floor(timePassSecond/(60*60*24*30*12)) + "y")
    }
  
}

export {didUserLikeDislikeTweet, timeDelta};