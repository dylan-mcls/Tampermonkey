
/*
	TODO Description
*/

function doTask(taskNum) {
	log("doTask Enter");
    var time = Math.floor(Math.random() * 3000);

    setTimeout(function () {
        console.log(taskNum);
        dequeTask();
    }, time)
}

function createTask(taskNum) {
	log("createTask Enter");
    return function () {
        doTask(taskNum);
    }
}

function queueTask(tasks) {
	log("queTask Enter");
    //Loops through task array
    for (var i in tasks) {
        $(document).queue('tasks', function(){
			createTask(tasks[i]);
		});
    }

    //Add a logger to the end of the task stating that all tasks have been completed
    $(document).queue('tasks', function () {
        log("All tasks completed");
    });
}

function dequeueTask() {
    $(document).dequeue('tasks');
}