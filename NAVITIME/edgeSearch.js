const mapData = [[0, 0, 0, 1],
                 [1, 1, 1, 1],
                 [1, 1, 1, 1],
                 [0, 1, 0, 0]]
let edgeData = [[0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]]

function startEdgeSearch(){
    for(let y = 0; y < mapData.length; ++y){
        for(let x = 0; x < mapData[0].length; ++x){
            if(mapData[y][x] == 1){
                edgeData[y][x] = 2;
                searchRight(x, y, flag=false);
                return 0;
            }
        }
    }
}

function searchRight(x, y, flag=false){
    if(mapData[y][x + 1] == 1){
        console.log("Right: "+x+","+y+" T");
        if(flag){
            if(edgeData[y][x + 1] == 2) return 0
            edgeData[y][x + 1] = 1;
        }
        return searchRight(x + 1, y);
    }else{
        console.log("Right: "+x+","+y+" F");
        if(!flag){
            if(edgeData[y][x + 1] == 2) return 0
            edgeData[y][x + 1] = 1;
        }
        return searchUnder(x, y);
    }
}
function searchUnder(x, y, flag=false){
    if(mapData[y + 1] != undefined){
        if(mapData[y + 1][x] == 1){
            console.log("Under: "+x+","+y+" T");
            if(flag){
                if(edgeData[y + 1][x + 1] == 2) return 0
                edgeData[y + 1][x + 1] = 1;
            }
            return searchRight(x, y + 1, flag=true);
        }
    }

    console.log("Under: "+x+","+y+" F");
    if(!flag){
        if(edgeData[y + 1][x + 1] == 2) return 0
        edgeData[y + 1][x + 1] = 1;
    }
    return searchLeft(x, y);
}
function searchLeft(x, y, flag=false){
    if(mapData[y][x - 1] == 1){
        console.log("Left : "+x+","+y+" T");
        if(flag){
            if(edgeData[y + 1][x] == 2) return 0
            edgeData[y + 1][x] = 1;
        }
        return searchUnder(x - 1, y, flag=true);
    }else{
        console.log("Left : "+x+","+y+" F");
        if(!flag){
            if(edgeData[y + 1][x] == 2) return 0
            edgeData[y + 1][x] = 1;
        }
        return searchUp(x, y);
    }
}
function searchUp(x, y, flag=false){
    if(mapData[y - 1]){
        if(mapData[y - 1][x] == 1){
            console.log("Up   : "+x+","+y+" T");
            if(flag){
                if(edgeData[y][x] == 2) return 0;
                edgeData[y][x] = 1;
            }
            return searchLeft(x, y - 1, flag=true);
        }
    }
    console.log("Up   : "+x+","+y+" F");
    if(!flag){
        if(edgeData[y][x] == 2) return 0;
        edgeData[y][x] = 1;
    }
    return searchRight2(x, y);
    
}
function searchRight2(x, y, flag=false){
    if(mapData[y][x + 1] == 1){
        console.log("Righ2: "+x+","+y+" T");
        return searchUp(x + 1, y, flag=true);
    }else{
        console.log("Righ2: "+x+","+y+" F");
        return searchRight2(x, y + 1);
    }
}

startEdgeSearch();
console.log(edgeData);