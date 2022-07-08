
const timeDelta = (data) =>{
    let timePass
    messageDate = new Date(data)
    td = new Date()
    timePassSecond = (td - messageDate)/1000
    if((timePassSecond/60) < 59){
        // second
        return "" + parseInt(timePassSecond/60)+" second(s)"
    }else if((timePassSecond/(60*60)) < 59){
        // Minute
        return "" + parseInt(timePassSecond/(60*60)) + " mimute(s)"
    }else if(timePassSecond/(60*60*60) < 59){
        // Hour(s)
        return "" + parseInt(timePassSecond/(60*60*60)) + " Hours"
    }else if(timePassSecond/(60*60*60*24)< 30){
        //Day(s)
        return "" + parseInt(timePassSecond/(60*60*60*24)) + " Day(s)"
    }else if(timePassSecond/(60*60*60*24*30) < 12){
        //Month(s)
        return "" + parseInt(timePassSecond/(60*60*60*24)) + " Month(s)"
    }else{
        //Year(s)
        return "" + parseInt(timePassSecond/(60*60*60*24*12)) + " Year(s)"
    }
}

export {timeDelta};