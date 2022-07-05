

const userId = document.getElementById("user-id").innerHTML

const didUserLikeDislikeTweet = (tweetLike)=>{
    var color = {"like":"", "dislike":""}

    for (let i = 0; i < tweetLike.length; i++) {
        if (userId == tweetLike[i].like_by || userId == tweetLike[i].like_by){

            if (tweetLike[i].like == true){
                color= {...color, like:"blue"};

            }else if(tweetLike[i].like ==false){
                color.dislike = "blue"
            }
        }
    }
    return color;
    
    
}


export {didUserLikeDislikeTweet};