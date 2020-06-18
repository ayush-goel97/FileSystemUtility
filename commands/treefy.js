let fs = require("fs");
let path = require("path");
module.exports.treefy = function () {
    let src = arguments[0];
    let dest = arguments[1];

    let buffer = fs.readFileSync(path.join(src,"metadata.json"));
    let root = JSON.parse(buffer);
    //console.log(json);
    treefyHandler(src,dest,root);
}

function treefyHandler(src,dest,node){

    let isFile = node.isFile;

    if(isFile){
        //file create
        //data copy
        let srcFilePath = path.join(src,node.newname);
        let destFilePath = path.join(dest,node.originalname);
        fs.copyFileSync(srcFilePath,destFilePath);
        console.log(`file copied from ${srcFilePath} to ${destFilePath}`);
    }else{
        //create directory
        let dirName = node.name;
        let crDirPath = path.join(dest,dirName);
        console.log(`Directory created at ${crDirPath}`);
        fs.mkdirSync(crDirPath);

        //visit children
        for(let i=0;i<node.children.length;i++){
            let child = node.children[i];
            let cDest = crDirPath;
            treefyHandler(src,cDest,child);
        }
    }
}