const express = require('express');
const app = express();

app.get('/mean', function(req, res){
    let {nums} = req.query;
    let numsArr = []
    let total = 0;

    if(!nums){
        return res
                .status(400)
                .json("Nums are required!");
    }

    for(let i = 0; i < nums.length; i++){
        if(Number.isInteger(parseInt(nums[i]))){
            numsArr.push(parseInt(nums[i]));
            total += parseInt(nums[i]);
        }
    }
    
    if(numsArr[0] == undefined){
        return res
                .status(400)
                .json("Nums are required!");
    }

    let mean = total / numsArr.length;

    return res.json({
        operation: "mean",
        value: mean
    });
});

app.get('/median', function(req, res){
    let {nums} = req.query;
    let numsArr = []

    if(!nums){
        return res
                .status(400)
                .json("Nums are required!");
    }

    for(let i = 0; i < nums.length; i++){
        if(Number.isInteger(parseInt(nums[i]))){
            numsArr.push(parseInt(nums[i]));
        }
    }
    
    if(numsArr[0] == undefined){
        return res
                .status(400)
                .json("Nums are required!");
    }

    if(numsArr.length % 2 == 0){
        let mid2 = Math.floor(numsArr.length / 2);
        let mid1 = mid2 - 1;

        return res.json({
            operation: "median",
            value: [numsArr[mid1], numsArr[mid2]]
        });
    }
    else{
        let mid = Math.floor(numsArr.length / 2);

        return res.json({
            operation: "median",
            value: numsArr[mid]
        });
    }
});

app.get('/mode', function(req, res){
    let {nums} = req.query;
    let numsArr = []
    let numsObj = {}
    let mode = [0]
    let count = 0;

    if(!nums){
        return res
                .status(400)
                .json("Nums are required!");
    }

    for(let i = 0; i < nums.length; i++){
        if(Number.isInteger(parseInt(nums[i]))){
            numsArr.push(parseInt(nums[i]));
        }
    }
    
    if(numsArr[0] == undefined){
        return res
                .status(400)
                .json("Nums are required!");
    }

    for(let i = 0; i < numsArr.length; i++){
        if(numsObj[numsArr[i]]){
            numsObj[numsArr[i]]++;
        }
        else{
            numsObj[numsArr[i]] = 1;
        }
    }

    for(let i in numsObj){
        if(numsObj[i] > count){
            mode = []
            mode.push(parseInt(i));
            count = numsObj[i]
        }
        else if(numsObj[i] == count){
            mode.push(parseInt(i));
        }
    }

    return res.json({
        operation: "mode",
        value: mode
    });
});

app.listen(3000, function(req){
    console.log("Server Online");
});
