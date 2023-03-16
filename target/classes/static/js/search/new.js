window.onload = () => {
    ToggleService.getInstance().loadlogin();

    ToggleButton.getInstance().logoutButton();
    ToggleButton.getInstance().toggleButton();

    NewService.getInstance().clearNewEmoList();
    NewService.getInstance().loadNewEmos();

    NewService.getInstance().setMaxPage();

    ComponentEvent.getInstance().addScrollEventPaging();
    ComponentEvent.getInstance().addClickEventLikeButtons();
}

let maxPage = 0;

const searchObj = {
    page: 1,
    searchValue: null,
    count: 10
}

class NewApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new NewApi();
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

class NewService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new NewService();
        }
        return this.#instance;
    }

    setMaxPage() {
        const totalCount = NewApi.getInstance().getTotalCount();
        maxPage = totalCount % 10 == 0
            ? totalCount / 10
            : Math.floor(totalCount / 10) + 1;

    }

    clearNewEmoList() {
        const contentFlex = document.querySelector(".new-info");
        contentFlex.innerHTML = "";
    }

    loadNewEmos() {
        const responseData = NewApi.getInstance().getNewEmo();
        const contentFlex = document.querySelector(".new-info");
        const principal = PrincipalApi.getInstance().getPrincipal();

        const _Buttons = document.querySelectorAll(".buttons");
        const ButtonsLength = _Buttons == null ? 0 : _Buttons.length;
        
        console.log(responseData)
        responseData.forEach((data, index) => {
            contentFlex.innerHTML += `
            <li>
            <a class="new-link" href="http://127.0.0.1:8000/main/detail/?emoCode=${data.emoCode}">
                <div class="new-info-title">
                <input type="hidden" class="emo-id" value="${data.emoId}">
                <input type="hidden" class="like-count" value="${data.likeCount}">
                <h2 class="emo-name">${data.emoName}</h2>
                <p class="author">${data.company}</p>
                </div>
            </a>
                <div class="buttons">
                <span class="like-count">${data.likeCount != null ? data.likeCount : 0}</span>
                
                </div>
                <div class="new-info-img">
                <img src="http://127.0.0.1:8000/image/emo/${data.newImage1 != null ? data.newImage1 : "noimg.jpg"}" class="emo-img">
                <img src="http://127.0.0.1:8000/image/emo/${data.newImage2 != null ? data.newImage2 : "noimg.jpg"}" class="emo-img">
                <img src="http://127.0.0.1:8000/image/emo/${data.newImage3 != null ? data.newImage3 : "noimg.jpg"}" class="emo-img">
                <img src="http://127.0.0.1:8000/image/emo/${data.newImage4 != null ? data.newImage4 : "noimg.jpg"}" class="emo-img">
                </div>
            </li>
            `;

            const Buttons = document.querySelectorAll(".buttons");
            
            if(principal == null) {         
                
                Buttons[ButtonsLength + index].innerHTML += `
                <button type="button" class="no-login-like like-button">
                <i class="fa-regular fa-heart"></i>
                </button>
                `;

                ComponentEvent.getInstance().addClickEventLikeButtonsNoLogin();

            }else {              
                if(data.likeId != 0){
                    console.log("ButtonLength : " + ButtonsLength);
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
                ComponentEvent.getInstance().addClickEventLikeButtons();
            }
            
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

    addScrollEventPaging() {
        const html = document.querySelector("html");
        const body = document.querySelector("body");

        body.onscroll = () => {
            const scrollPosition = body.offsetHeight - html.clientHeight - html.scrollTop;

            if(scrollPosition < 250 && searchObj.page < maxPage) {
                searchObj.page++;
                NewService.getInstance().loadNewEmos();
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
                    const likeCount = NewApi.getInstance().setLike(emoIds[index].value);
                    if(likeCount != -1){
                        likeCounts[index].textContent = likeCount;
                        button.classList.remove("like-button");
                        button.classList.add("dislike-button");
                    }
                    
                }else {
                    const likeCount = NewApi.getInstance().setDisLike(emoIds[index].value);
                    if(likeCount != -1){
                        likeCounts[index].textContent = likeCount;
                        button.classList.remove("dislike-button");
                        button.classList.add("like-button");
                    }
                }
            }
        });

    }
    addClickEventLikeButtonsNoLogin() {
        const likeButtonError = document.querySelectorAll(".no-login-like");
        const emoIds = document.querySelectorAll(".emo-id");

        likeButtonError.forEach((button, index) => {
            button.onclick = () => {
                
                if (confirm("로그인 후 사용 가능합니다")) {
                    location.href = "/account/login"
                }   
            }
        });
    } 
}

