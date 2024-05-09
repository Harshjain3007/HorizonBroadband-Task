const express = require('express')

const router = express.Router()


router.post('/generateoutput',async function(req,res){
    let includes = req.body.includes
    let excludes = req.body.excludes

    if(!includes || !excludes){
        return res.status(400).send({message:"Please enter both include as well as exclude ranges"})
    }

    const includeRanges = parseRanges(includes);
    const excludeRanges = parseRanges(excludes);

    const mergedIncludeRanges = mergeRanges(includeRanges);

    let result = mergedIncludeRanges

    for (let i = 0; i < excludeRanges.length; i++) {

        if (isNaN(excludeRanges[i].start) && isNaN(excludeRanges[i].end)) {
            result = mergedIncludeRanges;
            console.log(result);
        }
       else{
        result = excludeRangesFromRange(result, excludeRanges[i]);
       }
    }


    let output = ""
    for(let i=0;i<result.length;i++){
        
       
        output += `${result[i].start}-${result[i].end}`;
        if(i<result.length-1){
            output+=', '
        }
    
    }


    return res.status(201).send(output)


})



function parseRanges(rangeString) {
   rangeString  =rangeString.split(', ')
    let result = []
    for(let i=0;i<rangeString.length;i++){
        const [start,end] = rangeString[i].split('-')
         result.push({ start: parseInt(start), end: parseInt(end) })
    }
    return result
}

function mergeRanges(ranges) {
    ranges.sort((a, b) => a.start - b.start);
    const merged = [];
    let currentRange = ranges[0];
    for (let i = 1; i < ranges.length; i++) {
        const nextRange = ranges[i];
        if (currentRange.end >= nextRange.start - 1) {
            currentRange.end = Math.max(currentRange.end, nextRange.end);
        } else {
            merged.push({...currentRange});
            currentRange = nextRange;
        }
    }
    merged.push({...currentRange});
    return merged;
}


function excludeRangesFromRange(includeRanges, excludeRange){
    const result = [];
    for(let i=0;i<includeRanges.length;i++){
    
        if (excludeRange.start <= includeRanges[i].start && excludeRange.end >= includeRanges[i].end) {
               continue
        }
       
        else if (excludeRange.start > includeRanges[i].end|| excludeRange.end < includeRanges[i].start) {
            result.push(includeRanges[i]);
        }

       
     else if (excludeRange.start <=  includeRanges[i].start && excludeRange.end >= includeRanges[i].start) {
        result.push({ start: excludeRange.end + 1, end: includeRanges[i].end});
    }

    else if (excludeRange.end >=includeRanges[i].end && excludeRange.start <=includeRanges[i].end) {
        result.push({ start: includeRanges[i].start, end: excludeRange.start - 1 });
    } 

    else {
        result.push({ start:includeRanges[i].start, end: excludeRange.start - 1 });
        result.push({ start: excludeRange.end + 1, end:includeRanges[i].end});
    }

    }
    return result
}



module.exports  = router
