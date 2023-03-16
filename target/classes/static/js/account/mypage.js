window.onload = () => {

    ToggleService.getInstance().loadlogin();

    ToggleButton.getInstance().logoutButton();
    ToggleButton.getInstance().toggleButton();

    MypageService.getInstance().clearLikeCount();
    MypageService.getInstance().loadLikeCount();

    MypageService.getInstance().clearEmoLikeList();
    MypageService.getInstance().loadLikeEmos();

    MypageService.getInstance().setMaxPage();

    ComponentEvent.getInstance().addScrollEventPaging();
    ComponentEvent.getInstance().addClickEventLikeButtons();
}

let maxPage = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    count: 10
}

class MypageApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MypageApi();
        }
        return this.#instance;
    }

    getTotalCount() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/search/totalcount",
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

    getUserLikeEmo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/mypage/like",
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

    setLike(emoId) {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "post",
            url: `http://127.0.0.1:8000/api/emo/${emoId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }

    setDisLike(emoId) {
        let likeCount = -1;
        
        $.ajax({
            async: false,
            type: "delete",
            url: `http://127.0.0.1:8000/api/emo/${emoId}/like`,
            dataType: "json",
            success: response => {
                likeCount = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return likeCount;
    }

}

class MypageService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MypageService();
        }
        return this.#instance;
    }

    setMaxPage() {
        const totalCount = MypageApi.getInstance().getTotalCount();
        maxPage = totalCount % 10 == 0
            ? totalCount / 10
            : Math.floor(totalCount / 10) + 1;

    }

    clearLikeCount() {
        const contentFlex = document.querySelector(".like-title");
        contentFlex.innerHTML = "";
    }

    loadLikeCount() {
        const responseData = MypageApi.getInstance().getUserLikeEmo();
        const contentFlex = document.querySelector(".like-title");
        const principal = PrincipalApi.getInstance().getPrincipal();

        contentFlex.innerHTML +=`
            <h2>좋아요</h2>
            <p>${responseData.length}</p>
            `;
    }

    clearEmoLikeList() {
        const contentFlex = document.querySelector(".like-list");
        contentFlex.innerHTML = "";
    }

    loadLikeEmos() {
        const responseData = MypageApi.getInstance().getUserLikeEmo();
        const contentFlex = document.querySelector(".like-list");
        const principal = PrincipalApi.getInstance().getPrincipal();

        const _Buttons = document.querySelectorAll(".like-button");
        const ButtonsLength = _Buttons == null ? 0 : _Buttons.length;
        
        console.log(responseData)

            
            responseData.forEach((data, index) => {
                contentFlex.innerHTML += `
                <li class="like-lists">
                <input type="hidden" class="emo-id" value="${data.emoId}">
                <img src="http://127.0.0.1:8000/image/emo/${data.saveName != null ? data.saveName : "noimg.png"}" class="like-img">
                <div class="like-names">
                    <div class="like-button">

                    </div>
                    <a href="http://127.0.0.1:8000/main/detail/?emoCode=${data.emoCode}">
                        <div class="like-name">
                            <h3>${data.emoName}</h3>
                            <p>>${data.company}</p>
                        </div>
                    </a>
                </div>
                </li>
                `;

                const Buttons = document.querySelectorAll(".like-button");

                if(data.likeId != 0){
                    Buttons[ButtonsLength + index].innerHTML += `
                    <button type="button" class="like-buttons dislike-button">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    `;
                }else {
                    Buttons[ButtonsLength + index].innerHTML += `
                        <button type="button" class="like-buttons like-button">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                    `;
                }
                ComponentEvent.getInstance().addClickEventLikeButtons()
            });

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

    addScrollEventPaging() {
        const html = document.querySelector("html");
        const body = document.querySelector("body");

        body.onscroll = () => {
            const scrollPosition = body.offsetHeight - html.clientHeight - html.scrollTop;

            if(scrollPosition < 250 && searchObj.page < maxPage) {
                searchObj.page++;
                MypageService.getInstance().loadLikeEmos();
            }
        }
    }

    addClickEventLikeButtons() {
        const likeButtons = document.querySelectorAll(".like-buttons");
        const emoIds = document.querySelectorAll(".emo-id");
        const likeCounts = document.querySelectorAll(".like-count")

        likeButtons.forEach((button, index) => {
            button.onclick = () => {
                if(button.classList.contains("like-button")){
                    const likeCount = MypageApi.getInstance().setLike(emoIds[index].value);
                    if(likeCount != -1){
                        button.classList.remove("like-button");
                        button.classList.add("dislike-button");
                    }
                    
                }else {
                    const likeCount = MypageApi.getInstance().setDisLike(emoIds[index].value);
                    if(likeCount != -1){
                        button.classList.remove("dislike-button");
                        button.classList.add("like-button");
                    }
                }
            }
        });
    }
   
}