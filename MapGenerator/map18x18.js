// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs');
var mapInput;
var mapOutput = {};

    
fs.readFile('./src/game/Data/map2.json', 'utf8', (err, data) => {
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

    fs.writeFile('MapOutput.json', JSON.stringify(mapOutput), (err) => {
        
        // In case of a error throw err.
        if (err) throw err;
    });
  });
    
  function createMaps(item)
  {
      var mapName = item;
      var mapTiles = mapInput[mapName];

      var tiledMap = [];
      var index = 0;

      //empty row on bottom
      var row = [];
      for(var j = 0;  j < 18; j++)
      {
        row.push(1);
      }
      tiledMap.push(row);

      for(var i = 0; i < 16; i++)
      {
        row = [];
        //empty cell in front for each row
        row.push(1);
        for(var j = 0;  j < 16; j++)
        {
          if (mapTiles.includes(index))
          {
            row.push(0);
          }
          else
          {
            row.push(1);
          }
          index++;
        }
        //emptry cell at end for each row
        row.push(1);
        tiledMap.push(row);
      }

      //tileMap - 16x16 tiles
      //converting to 18x18

      //empty row on top
      row = [];
      for(var j = 0;  j < 18; j++)
      {
        row.push(1);
      }
      tiledMap.push(row);
      
      mapOutput[mapName] = tiledMap;
      
  }