let maxPage = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    count: 10
}

class MainPageApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MainPageApi();
        }
        return this.#instance;
    }

    getTotalCount() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/hot/search/totalcount",
            data: searchObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }

    searchEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/hot/search",
            data: searchObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }

    getNewEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/new/search",
            data: searchObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }
}

class MainPageService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MainPageService();
        }
        return this.#instance;
    }

    setMaxPage() {
        const totalCount = MainPageApi.getInstance().getTotalCount();
        maxPage = totalCount % 10 == 0
            ? totalCount / 10
            :Math.floor(totalCount / 10) + 1;
    }

    clearHotEmoList() {
        const contentFlex = document.querySelector(".new-list");
        contentFlex.innerHTML = "";
    }
    clearNewEmoList() {
        const contentFlex = document.querySelector(".hot-list");
        contentFlex.innerHTML = "";
    }

    loadNewEmos() {
        const responseData = MainPageApi.getInstance().getNewEmo();
        const contentFlex = document.querySelector(".new-list");

        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML +=`
                <li>
                    <a class="index-link" href="http://127.0.0.1:8000/main/detail/?emoCode=${data.emoCode}">
                        <img src="http://127.0.0.1:8000/image/emo/${data.newImage1 != null ? data.newImage1  : "noimg.jpg"}" alt="" class="emo-img">
                        <h2 class="emo-name">${data.emoName}</h2>
                    </a>
                </li>
            `
        })

        
    }
    
    loadHotEmos() {
        const responseData = MainPageApi.getInstance().searchEmo();
        const contentFlex = document.querySelector(".hot-list");
        const principal = PrincipalApi.getInstance().getPrincipal();

        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML +=`
                <li>
                    <a class="index-hot-link" href="http://127.0.0.1:8000/main/detail/?emoCode=${data.emoCode}">
                        <span class="emo-id">${data.emoId}</span>
                        <div class="hot-sub-list">
                            <h2 class="emo-name">${data.emoName}</h2>
                            <p class="author">${data.company}</p>
                        </div>
                        <div class=".index-img-box">
                            <img src="http://127.0.0.1:8000/image/emo/${data.saveName != null ? data.saveName : "noimg.jpg"}" alt="" class="emo-img">
                        </div>
                    </a>
                </li>
            `
        })

        
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    } 
}