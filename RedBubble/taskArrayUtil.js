//slightly modified from
//https://stackoverflow.com/questions/15504921/asynchronous-loop-of-jquery-deferreds-promises?answertab=votes#tab-top

/*
	TODO Description
*/

var time = Math.floor(Math.random()*3000);

function doTask(taskNum, next){
    setTimeout(function(){
        logger(taskNum);
        next();
    },time)
}

function createTask(taskNum){
    return function(){
        doTask(taskNum, dequeueTask);
    }
}

function queueTask(tasks){
//tasks is an array of functions
for (var i = 0; i < tasks.length; i++){
    $(document).queue('tasks', createTask(tasks[i]));
}

$(document).queue('tasks', function(){
    logger("All tasks dequeued");
});
}

function dequeueTask(){
	$(document).dequeue('tasks');
}