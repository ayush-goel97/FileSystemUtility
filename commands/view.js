let fs = require("fs");
let path = require("path");


module.exports.view = function () {
  let src = arguments[0];
  let args = arguments[1];
  if (args == "-t") {
    viewAsTree(src, "");
  } else if (args == "-f") {
    viewAsFlatFiles(src,path.basename(src));
  } else {
    console.log("Wrong Argument");
  }
}

function viewAsTree(src, psf) {
  let isFile = fs.lstatSync(src).isFile();
  let name = path.basename(src);

  if (isFile) {
    console.log(psf + name + "*");
  } else {
    console.log(psf + name);
    let content = fs.readdirSync(src);
    //console.log(content);
    for (let i = 0; i < content.length; i++) {
      let child = content[i];
      let cPath = path.join(src, child);
      viewAsTree(cPath, psf + "\t");
    }
  }

}


function viewAsFlatFiles(src,toprint) {
  let isFile = fs.lstatSync(src).isFile();

    if(isFile){
        console.log(toprint+ "*");
    }else{
        console.log(toprint);
        let content = fs.readdirSync(src);
        //console.log(content);
        for(let i=0;i<content.length;i++){
            let child = content[i];
            let cPath = path.join(src,child);
            let ctoprint = path.join(toprint,child);
            viewAsFlatFiles(cPath,ctoprint);
        }
    }
}