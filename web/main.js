(async()=>{
    // get search text query param
    const queryParams = new URLSearchParams(window.location.search)
    const searchText = queryParams.get("q")

    const stepEl = q("#step")
    stepEl.textContent = "Step 1: Type in your question"

    const searchEl = q("#searchBox")

    if(typeof(searchText)!=="string"){
        stepEl.innerHTML = "Type in the question. Then copy the link from the button below <br><button>Copy URL</button>"
        stepEl.q("button").onclick=()=>{
            let url = window.location.protocol+"//"+window.location.host+"?q="+encodeURIComponent(searchEl.value)
            window.navigator.clipboard.writeText(url)
        }
        return
    }

    let searchVal = ""
    setInterval(()=>{
        searchEl.value = searchVal
    },20)

    const mouseEl = q("#mouse")
    let mouseX = 0;
    let mouseY = 0;
    function updateMouse(){
        mouseEl.style.left = mouseX+"px";
        mouseEl.style.top =  mouseY+"px";
    }
    async function transitionPosition(x, y){
        let debugNumber = Math.round(Math.random()*1000)
        // console.log('Starting transition '+debugNumber)
        let mouseSpeed = 10
        let iterations = Math.max(Math.abs(Math.round(((x-mouseX)+(y-mouseY))/mouseSpeed)), 20)
        // console.log((x-mouseX), (y-mouseY), mouseSpeed)
        // console.log(iterations)

        for(let i = 0;i<iterations;i++){
            mouseX += (x-mouseX)/mouseSpeed
            mouseY += (y-mouseY)/mouseSpeed
            updateMouse()
            await sleep(1000/120)
        }


        updateMouse()
        // console.log('Ending transition '+debugNumber)
    }
    

    const searchRect = searchEl.getBoundingClientRect()
    await transitionPosition(searchRect.left+(searchRect.width/2)-20, searchRect.top+20)
    searchEl.focus()
    
    for(let i = 0;i<searchText.length;i++){
        searchVal+=searchText[i]
        await sleep(200)
    }

    const searchButtonEl = q("#searchButton")
    stepEl.textContent = "Step 2: Click the search button."
    const searchButtonRect = searchButtonEl.getBoundingClientRect()
    await transitionPosition(searchButtonRect.left+searchButtonRect.width/2, searchButtonRect.top+searchButtonRect.height/2)
    await sleep(50)
    searchButtonEl.focus()


    await sleep(2000)
    stepEl.textContent = "Come on... Was that really so hard?"

    await sleep(100)
    if(searchText!=="")window.location.assign("https://google.com/search?q="+encodeURIComponent(searchText))
})()