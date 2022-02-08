const debounce=(func,delay=1000)=>{
    let timeoutId;
return(...args)=>{
    if(timeoutId){
        clearTimeout(timeoutId)  //to stop the existing timer
    }
    timeoutId= setTimeout(()=>{
     func.apply(null,args)    //takes all arguements which is inside func
    },delay)
}
}