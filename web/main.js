(async()=>{
    const searchEl = q("#searchBox")
    searchEl.value = ""
    
    const queryParams = new URLSearchParams(window.location.search)
    const searchText = queryParams.get("q")

    const stepEl = q("#step")
    stepEl.textContent = "Step 1: Type in your question."
    
    for(let i = 0;i<searchText.length;i++){
        searchEl.value+=searchText[i]
        await sleep(200)
    }

    stepEl.textContent = "Step 2: Click the search button."

    await sleep(2000)
    stepEl.textContent = "Come on... Was that really so hard?"

    window.location.assign("https://google.com/search?q="+encodeURIComponent(searchText))
})()