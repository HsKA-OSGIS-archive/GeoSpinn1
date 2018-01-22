var my_json = [
{
 "type": "buffer",
 "id"  : 1,
 "parameters" :{
	  "l1": "input_layer1",
	  "radius": {
		"default_dist" : 200,
		"user_defineable" : false,
		"units" : "kilometers",
		"dissolve" : true
	  }
 }
}, 
{
 "type": "intersect",
 "id"  : 2,
 "parameters" : {
  "l1": 1,
  "l2": "input_layer2"
 }
},
{
 "type": "difference",
 "id"  : 3,
 "parameters" : {
  "l1": "input_layer2",
  "l2": 1       // layer to be subtracted out of first one
 }
},
/*{
 "type": "union",           //Only Polygon features for union
 "id"  : 4,
 "parameters" : {
  "l1": 1,
  "l2": 3
 }
},*/
,{
 "type": "combine",           //Only Polygon features for union
 "id"  : 4,
 "parameters" : {
  "l1": 1,
  "l2": 3
 }
}

];   