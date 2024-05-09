POST Api to get the output which includes those ranges and ignores the output which excludes those ranges
1)Create a POST api called as generate output which will  accept the includes and excludes
  of a given range to get the required output
2)Call a function called as 'parse ranges' for both includes  and excludes range which will parse each range 
  of iclude and exclude into a seprate object and push them into a resultant array
3)create a seperate function called as 'mergeRanges' for include ranges to merge them in ascending order where 
  the start of each range should be less than the end of each range
4)Iterate over the eclude ranges and finally call the 'excludeRangesFromRange'  and take the exludeRanges and 
  result obtained above in the arguments to filter the exclude 
  range and get the required output.


.Endpoint/bseurl 
 - localhost:3000/controllerroutes/generateoutput

.Sample request body

  {

 "includes":"200-300, 10-100, 400-500",
  "excludes":""410-420, 95-205, 100-150""


 }

 .Procedure to clone the code
 - git clone
 - npm i