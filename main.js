const textboxes = document.querySelectorAll('.textbox');

function updateCols() {
    textboxes.forEach(textbox => {
        const screenWidth = window.innerWidth;
        const cols = Math.floor(screenWidth / 10 / 3); // Adjust the divisor for desired width
        textbox.setAttribute('cols', cols);
    });
}

// Initial cols update
updateCols();

// Update cols when the screen width changes
window.addEventListener('resize', updateCols);

textboxes.forEach(textbox => {
    textbox.addEventListener('input', () => {
        // Replace single newlines with double newlines
        if (!textbox.value.includes('| --- |'))
            textbox.value = textbox.value.replace(/(?<!\n)\n(?!\n)/g, '\n\n');

        textbox.style.height = 'auto'; // Reset the height to auto
        textbox.style.height = textbox.scrollHeight + 'px'; // Set the height to fit content

    });

});

function fixJobless() {

    var oldURL = document.querySelector("#inputURL").value.trim()
    var queue = document.querySelector("#queue").value.trim()
    var newURL = document.querySelector("#outputURL")

    if (oldURL && queue.includes('?') && queue.includes('job') && queue.includes('project')) {
        var oldURL_list = []
        if (!oldURL.includes('| --- |'))
            oldURL_list = oldURL.replace(' ', '').split("\n\n")
        else
            oldURL_list = oldURL.replace(' ', '').split("\n")

        var newJob = queue.split("?")[1].replace('job', "jobId").replace('project', "task")

        var newURL_list = []

        oldURL_list.forEach(e => {
            newURL_list.push(e.replace(/task=\w+/g, newJob))
        })
        if (!oldURL.includes('| --- |'))
            newURL.value = newURL_list.join('\n\n')
        else
            newURL.value = newURL_list.join('\n')

        newURL.style.height = 'auto'; // Reset the height to auto
        newURL.style.height = newURL.scrollHeight + 'px'; // Set the height to fit content
    }
}

function addClaimed() {

    var oldURL = document.querySelector("#inputURL").value.trim()
    var claimed = '&job=claimed'
    var newURL = document.querySelector("#outputURL")

    if (oldURL) {

        if (newURL.value) {
            oldURL = newURL.value.trim()
        }

        var oldURL_list = []
        if (!oldURL.includes('| --- |'))
            oldURL_list = oldURL.replace(' ', '').split("\n\n")
        else
            oldURL_list = oldURL.replace(' ', '').split("\n")

        var newURL_list = []

        oldURL_list.forEach(e => {
            if (e.includes('#')) {
                let splitUrl = e.split('#')
                newURL_list.push(`${splitUrl[0]}${claimed}#${splitUrl[1]}`)

            } else
                newURL_list.push(`${e}${claimed}`)
        })

        if (!oldURL.includes('| --- |'))
            newURL.value = newURL_list.join('\n\n')
        else
            newURL.value = newURL_list.join('\n')

        newURL.style.height = 'auto'; // Reset the height to auto
        newURL.style.height = newURL.scrollHeight + 'px'; // Set the height to fit content
    }

}

function loop() {

    var queue = document.querySelector("#queue").value.trim()

    if (queue.includes('?') && queue.includes('job') && queue.includes('project')) {
        document.querySelector("#fixjobless").style.backgroundColor = "#007bff";
        document.querySelector("#fixjobless").style.cursor = 'pointer'
        document.querySelector("#fixjobless").disabled = false;
    } else {
        document.querySelector("#fixjobless").style.backgroundColor = "grey";
        document.querySelector("#fixjobless").style.cursor = 'not-allowed'
        document.querySelector("#fixjobless").disabled = true;
    }
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)