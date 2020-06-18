let fs = require("fs");
let path = require("path");
let uniqid = require('uniqid');
module.exports.untreefy = function () {
    let src = arguments[0];
    let dest = arguments[1];
    //console.log("untreefy is implemented");
    let root = {};
    untreefyHandler(src,dest,root);
    fs.writeFileSync(`${dest}/metadata.json`,JSON.stringify(root));
}

function untreefyHandler(src,dest,node){
    let isFile = fs.lstatSync(src).isFile();

    if(isFile){
        //data copy
        let newFileName = uniqid();
        let destPath = path.join(dest,newFileName);
        fs.copyFileSync(src,destPath);

        //information store
        node.isFile = true;
        node.originalname = path.basename(src);
        node.newname = newFileName;

        console.log(`Data copied from ${src} to ${destPath}`);
    }else{
        //store information
        node.isFile = false;
        node.children = [];
        node.name = path.basename(src);

        //recursion
        let content = fs.readdirSync(src);
        for(let i=0;i<content.length;i++){
            let child = content[i];

            let chobj = {};
            let cPath = path.join(src,child);
            untreefyHandler(cPath,dest,chobj);
            node.children.push(chobj);
        }
    }
}