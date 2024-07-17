export default function dataURItoBlob(dataURI){
    //convert base64/URLencoded data component to row binary data held in a string
     var viteString;
     if(dataURI.split(",")[0].indexOf("base64") >= 0){
        viteString = atob(dataURI.split(",")[1])
     }else{
        viteString = decodeURI(dataURI.split(",")[1])
     }

     //separate out the mime file
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
     
    //write the bytes of the string to a typed array
    var ia = new Uint8Array(viteString.length)
    for(var i = 0; i < viteString.length; i++){
        ia[i] = viteString.charCodeAt(i)
    }
    return new Blob([ia], { type: mimeString })
}

