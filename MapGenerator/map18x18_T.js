// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs');

var tile = {
  "floor" : 0,
  "empty" : 1,
  "corner-shadow" : 2,
  "right-short-wall" : 3,
  "right-wall" : 4,
  "top-shadow" : 5,
  "left-short-wall" : 6,
  "left-wall" : 7,
  "left-shadow" : 8,
  "left-short-top-wall" : 9,
  "right-short-top-wall" : 10,
  "wall" : 11
};

var mapInput;
var mapOutput = {};

    
fs.readFile('map2.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    var finalMaps = {};
    mapInput = JSON.parse(data);

    for(let x in mapInput)
    {
      createMaps(x);
    }

    fs.writeFile('../../IPC_Dungeons/src/game/Data/MapOutput18x18.json', JSON.stringify(mapOutput), (err) => {
        
        // In case of a error throw err.
        if (err) throw err;
    });
  });

  function createLayer()
  {
     var layer = [];
    // var row = [];
     //empty row
    for(var j = 0;  j < 18; j++)
    {
      layer.push(new Array(18).fill(tile.empty));
    }
     //creating empty layer
    // for(var j = 0;  j < 18; j++)
    // {
    //   layer.push(row);
    // }
    //return layer;

    return layer;
  }
    
  function createMaps(item)
  {
      var mapName = item;
      var mapTiles = mapInput[mapName];

      var layer0 = createLayer();
      var layer1 = createLayer(); //main wall
      var layer2 = createLayer(); //shadow
      var layer3 = createLayer(); //left walls              
      var layer4 = createLayer(); //right walls 
      var layer5 = createLayer(); //left short walls              
      var layer6 = createLayer(); //right short walls              




      var index = 0;


      for(var i = 0; i < 16; i++)
      {
        for(var j = 0;  j < 16; j++)
        {
          //is tile in the list
          if (mapTiles.includes(index))
          {
            //set floor
            layer0[i+1][j+1] = tile.floor;

            //was previous tile is not floor
            if(layer0[i+1][j] == tile.empty)
            {
              //side shadow
              layer2[i+1][j+1] = tile['left-shadow'];
              //side wall left
              layer4[i+1][j] = tile['left-wall']; //<====
            }

            //is tile on top empty
            if(layer0[i][j+1] == tile.empty)
            {
              //Top wall
              layer1[i][j+1] = tile.wall;
              //is tile before top-wall empty
              // if(layer1[i][j] == tile.empty)
              // {
              //   layer1[i][j] = tile['right-short-top-wall'];
              // }

              //is previous tile empty
              if(layer0[i+1][j] == tile.empty)
              {
                //corner shadow
                layer2[i+1][j+1] = tile['corner-shadow'];
              }
              else
              {
                //top wall shadow
                layer2[i+1][j+1] = tile['top-shadow'];
              }
            }
          }
          index++;
        }

      }

      
      for(var i = 0; i < 18; i++)
      {
        for(var j = 0;  j < 18; j++)
        {
          //bottom wall
          if(layer0[i][j] == tile.floor && layer0[i+1][j] == tile.empty)
          {
            layer1[i][j] = tile.wall;
          }
          //side wall right
          if(layer0[i][j] == tile.floor && layer0[i][j+1] == tile.empty)
          {
            layer3[i][j+1] = tile['right-wall']; //<===
          }
          //side top wall right
          if(layer1[i][j] == tile.wall && layer1[i][j-1] == tile.empty)
          {
            if(layer0[i][j-1] == tile.empty)
            {
              layer6[i][j-1] = tile['right-short-top-wall'];
            }
            else
            {
              layer6[i][j] = tile['left-short-top-wall'];
            }
            
          }
          //side top wall left
          if(layer1[i][j] == tile.wall && layer1[i][j+1] == tile.empty)
          {
            if(layer0[i][j+1] == tile.empty)
            {
              layer5[i][j+1] = tile['left-short-top-wall'];
            }
            else
            {
              layer5[i][j] = tile['right-short-top-wall'];
            }
            
          }
        }
      }


      mapOutput[mapName] = {};
      mapOutput[mapName][0] = layer0;
      mapOutput[mapName][1] = layer1;
      mapOutput[mapName][2] = layer2;
      mapOutput[mapName][3] = layer3;
      mapOutput[mapName][4] = layer4;
      mapOutput[mapName][5] = layer5;
      mapOutput[mapName][6] = layer6;



      
  }