(async()=>{
    // get search text query param
    const queryParams = new URLSearchParams(window.location.search)
    const searchText = queryParams.get("q")

    // make sure content is blank.
    const searchEl = q("#searchBox")
    searchEl.value = ""

    const mouseEl = q("#mouse")
    let mouseX = 0;
    let mouseY = 0;
    function updateMouse(){
        mouseEl.style.left = mouseX+"px"
        mouseEl.style.top = mouseY+"px"
    }
    async function transitionPosition(x, y){
        const mouseSpeed = 10
        let iterations = ((x-mouseX)+(y-mouseY))/mouseSpeed

        for(let i = 0;i<iterations;i++){
            mouseX += (x-mouseX)/mouseSpeed
            mouseY += (y-mouseY)/mouseSpeed
            updateMouse()
            await sleep(1000/60)
        }
    }


    const stepEl = q("#step")
    stepEl.textContent = "Step 1: Type in your question."

    await transitionPosition(searchEl.getBoundingClientRect().left+(searchEl.getBoundingClientRect().width/2)-20, searchEl.getBoundingClientRect().top+20)
    searchEl.focus()
    
    for(let i = 0;i<searchText.length;i++){
        searchEl.value+=searchText[i]
        await sleep(200)
    }

    const searchButtonEl = q("#searchButton")
    stepEl.textContent = "Step 2: Click the search button."
    await transitionPosition(searchButtonEl.getBoundingClientRect().left, searchButtonEl.getBoundingClientRect().top)


    await sleep(2000)
    stepEl.textContent = "Come on... Was that really so hard?"

    await sleep(100)
    if(searchText!=="")window.location.assign("https://google.com/search?q="+encodeURIComponent(searchText))
})()